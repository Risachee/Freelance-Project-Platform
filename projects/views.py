from rest_framework.viewsets import ModelViewSet
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)