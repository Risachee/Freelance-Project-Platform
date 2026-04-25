from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    ordering = ["order"]  # сортировка

    def get_queryset(self):
        return Task.objects.filter(
            project__owner=self.request.user
        )