from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs["project_pk"]

        return Task.objects.filter(
            project_id=project_id,
            project__owner=self.request.user
        ).order_by("order")

    def perform_create(self, serializer):
        project_id = self.kwargs["project_pk"]

        serializer.save(project_id=project_id)
    
    def perform_update(self, serializer):
        project_id = self.kwargs["project_pk"]

        task = serializer.instance

        if task.project.owner != self.request.user:
            raise PermissionDenied()

        serializer.save()