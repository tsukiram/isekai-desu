#isekai/models.py (pastikan komen ini selalu ada)

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
from PIL import Image

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=1000)
    description = models.TextField(max_length=5000)
    content = models.TextField()
    cover_image = models.ImageField(upload_to='assets/Book', blank=True)
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.cover_image:
            img = Image.open(self.cover_image.path)
            if img.height > 500 or img.width > 500:
                output_size = (500, 500)
                img.thumbnail(output_size)
                img.save(self.cover_image.path)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('post-detail', kwargs={'pk': self.pk})

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.post.title}'
