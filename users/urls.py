from django.urls import path
from .api_views import (
    CustomLoginView,
    RegisterView,
    ProfileView,
    UserProfileUpdate,
    LoginStatusView,
    logout_view,
    ForgotPasswordView,
    ResetPasswordView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='api-register'),
    path('profile/', ProfileView.as_view(), name='api-profile'),
    path('profile/update/', UserProfileUpdate.as_view(), name='profile-update'),
    path('login/', CustomLoginView.as_view(), name='api-login'),
    path('login-status/', LoginStatusView.as_view(), name='api-login-status'),
    path('logout/', logout_view, name='logout'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset-password'),
]