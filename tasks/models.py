from django.db import models
from projects.models import Project

class Task(models.Model):
    class Status(models.TextChoices):
        TODO = "todo"
        IN_PROGRESS = "in_progress"
        DONE = "done"

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.TODO)

    priority = models.IntegerField(default=1)
    order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)