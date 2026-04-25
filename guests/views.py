from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Guest
from projects.models import Project


class CreateGuestLinkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, project_id):
        project = Project.objects.get(
            id=project_id,
            owner=request.user
        )

        guest = Guest.objects.create(project=project)

        return Response({
            "token": str(guest.token),
            "link": f"/api/guests/{guest.token}/"
        })
    
class GuestProjectView(APIView):
    def get(self, request, token):
        guest = Guest.objects.get(token=token)
        project = guest.project

        return Response({
            "title": project.title,
            "description": project.description
        })