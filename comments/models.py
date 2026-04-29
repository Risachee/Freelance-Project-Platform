from django.db import models

class Comment(models.Model):
    project = models.ForeignKey(
        "projects.Project",
        on_delete=models.CASCADE,
        related_name="comments"
    )
    author = models.ForeignKey(
        "users.User",
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
    guest_token = models.UUIDField(null=True, blank=True)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)