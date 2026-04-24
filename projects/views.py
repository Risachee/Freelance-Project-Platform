from rest_framework.viewsets import ModelViewSet
from .models import Project
from .serializers import ProjectSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)

class ProjectViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.instance.owner != self.request.user:
            raise PermissionDenied()
        serializer.save()