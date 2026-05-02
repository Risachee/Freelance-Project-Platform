import uuid
from django.db import models


class Guest(models.Model):
    project = models.ForeignKey("projects.Project", on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)