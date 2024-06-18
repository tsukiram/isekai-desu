from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
from .models import Post, Comment, Category, Favorite
from .serializers import PostSerializer, CommentSerializer, CategorySerializer, FavoriteSerializer
from django.http import Http404
from django.core.exceptions import PermissionDenied
from rest_framework.generics import CreateAPIView

import logging

logger = logging.getLogger(__name__)

class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class PostCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            post = serializer.save()
            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Tambahkan log ini untuk memeriksa kesalahan serialisasi
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PostDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            post = Post.objects.get(pk=pk)
            if post.author != request.user:
                raise PermissionDenied("You do not have permission to perform this action.")
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class PostListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        posts = Post.objects.all().order_by('-date_posted')  # Mengurutkan post dari yang paling baru hingga yang paling lama
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class PostDetailView(APIView):
    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PostSerializer(post)
        return Response(serializer.data)

class CategoryPostListView(APIView):
    def get(self, request, category_name):
        if category_name.lower() == "all":
            posts = Post.objects.all()
        else:
            try:
                category = Category.objects.get(name__iexact=category_name)
                posts = Post.objects.filter(category=category)
            except Category.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
class CommentListView(APIView):
    def get(self, request, post_id):
        try:
            post = Post.objects.get(pk=post_id)
            comments = post.comments.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

class CommentCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        print("Request data:", self.request.data)  # Log incoming request data
        print("Serializer valid:", serializer.is_valid())
        print("Serializer errors:", serializer.errors)  # Log serializer errors
        serializer.save(user=self.request.user)


class CommentUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def put(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk)
        if comment.user != request.user:
            raise PermissionDenied("You do not have permission to perform this action.")
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            comment = Comment.objects.get(pk=pk)
            if comment.user != self.request.user:
                raise PermissionDenied("You do not have permission to perform this action.")
            return comment
        except Comment.DoesNotExist:
            raise Http404

    def delete(self, request, pk, *args, **kwargs):
        comment = self.get_object(pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework.generics import ListAPIView

class FavoriteListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(favorite__user=user)


class ToggleFavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        post_id = request.data.get('post_id')
        if not post_id:
            return Response({'error': 'Post ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            favorite = Favorite.objects.get(user=user, post_id=post_id)
            favorite.delete()
            return Response({'message': 'Post removed from favorites'}, status=status.HTTP_204_NO_CONTENT)
        except Favorite.DoesNotExist:
            Favorite.objects.create(user=user, post_id=post_id)
            return Response({'message': 'Post added to favorites'}, status=status.HTTP_201_CREATED)

