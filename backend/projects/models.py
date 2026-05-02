from django.db import models
from users.models import User

class Project(models.Model):
    class Status(models.TextChoices):
        DISCUSSION = "discussion"
        ACTIVE = "active"
        PAUSED = "paused"
        DONE = "done"

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DISCUSSION
    )

    deadline = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)