from rest_framework import serializers
from .models import Post, Comment, Category, Favorite
from users.models import Profile

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class PostSerializer(serializers.ModelSerializer):
    cover_image_name = serializers.SerializerMethodField()
    cover_image = serializers.ImageField(required=False)
    author_name = serializers.StringRelatedField(source='author', read_only=True)
    profile_image = serializers.SerializerMethodField()
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['author', 'date_posted']

    def get_author_name(self, obj):
        if obj.author:
            return obj.author
        return None
  
    def get_category_name(self, obj):
        if obj.category:
            return obj.category.name
        return None
  
    def get_cover_image_name(self, obj):
        if obj.cover_image:
            return obj.cover_image.name
        return None

    def get_cover_image(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None

    def get_profile_image(self, obj):
        profile = Profile.objects.filter(user=obj.author).first()
        if profile:
            return profile.image.name
        return None

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return Post.objects.create(**validated_data)

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    profilImg = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'username', 'profilImg', 'user']

    def get_username(self, obj):
        return obj.user.username if obj.user else None

    def get_profilImg(self, obj):
        if obj.user and hasattr(obj.user, 'profile'):
            if obj.user.profile.image:
                return obj.user.profile.image.name
            else:
                return None
        return None

    def create(self, validated_data):
        print("Validated data:", validated_data)
        return super().create(validated_data)

class FavoriteSerializer(serializers.ModelSerializer):
    author_name = serializers.StringRelatedField(source='author', read_only=True)

    class Meta:
        model = Favorite
        fields = '__all__'

    def get_author_name(self, obj):
        return obj.user.username if obj.user else None
