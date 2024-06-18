## users/api_views.py

from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Profile
from .serializers import UserRegistrationSerializer, ProfileSerializer, ProfileUpdateSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from django.urls import reverse_lazy
from rest_framework.permissions import  IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.conf import settings




class UserProfileUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = request.user.profile
        serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_view(request):
    try:
        token = request.auth
        if token:
            token.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LoginStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        return Response({'is_logged_in': True})

class CustomLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

User = get_user_model()

class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            username = serializer.validated_data['username']
            try:
                user = User.objects.get(email=email, username=username)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                reset_link = f"{settings.FRONTEND_URL}/changePassword/{uid}/{token}/"
                send_mail(
                    subject="Password Reset Request",
                    message=f"Click the link to reset your password: {reset_link}",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[email],
                )
                return Response({"message": "Password reset link has been sent to your email."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            serializer = ResetPasswordSerializer(data=request.data)
            if serializer.is_valid():
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response({"message": "Password has been reset."}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Invalid token or user ID."}, status=status.HTTP_400_BAD_REQUEST)