# isekai/urls.py

from django.urls import path
from .api_views import (
    PostCreateView,
    PostListView,
    PostDeleteView,
    PostDetailView,
    CategoryPostListView,
    CategoryListView,
    CommentListView,
    CommentCreateView,
    CommentUpdateView,
    CommentDeleteView,
    FavoriteListView,
    ToggleFavoriteView
)

urlpatterns = [
    path('api/post/create/', PostCreateView.as_view(), name='api-post-create'),
    path('api/posts/', PostListView.as_view(), name='api-post-list'),
    path('api/posts/<int:pk>/', PostDetailView.as_view(), name='api-post-detail'),
    path('api/posts/<int:pk>/delete/', PostDeleteView.as_view(), name='api-post-delete'),
    path('api/posts/category/<str:category_name>/', CategoryPostListView.as_view(), name='category-post-list'),
    path('api/posts/<int:post_id>/comments/', CommentListView.as_view(), name='api-comment-list'),
    path('api/categories/', CategoryListView.as_view(), name='api-category-list'),
    path('api/favorite/list/', FavoriteListView.as_view(), name='api-favorite-list'),
    path('api/favorite/toggle/', ToggleFavoriteView.as_view(), name='api-toggle-favorite'),
    path('api/comments/create/', CommentCreateView.as_view(), name='api-comment-create'),
    path('api/comments/<int:pk>/', CommentUpdateView.as_view(), name='api-comment-update'),
    path('api/comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='api-comment-delete'),
]
