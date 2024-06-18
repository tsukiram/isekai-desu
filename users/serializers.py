## users/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        Profile.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile

        fields = '__all__'

    def get_image(self, obj):
        return obj.image.name if obj.image else None


class ProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ('username', 'email', 'image')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user

        # Update the user fields
        user.username = user_data.get('username', user.username)
        user.email = user_data.get('email', user.email)
        user.save()

        # Update the profile image if provided
        if 'image' in validated_data:
            instance.image = validated_data.get('image', instance.image)
        instance.save()

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['username'] = instance.user.username
        representation['email'] = instance.user.email
        representation['image'] = instance.image.url if instance.image else None
        return representation

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        username = data.get('username')
        if not User.objects.filter(email=email, username=username).exists():
            raise serializers.ValidationError("No user found with this email and username combination.")
        return data


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data