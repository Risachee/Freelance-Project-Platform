from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from guests.models import Guest
from .models import Comment
from .serializers import CommentSerializer


class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs["project_pk"]

        return Comment.objects.filter(
            project_id=project_id,
            project__owner=self.request.user
        ).order_by("created_at")

    def perform_create(self, serializer):
        project_id = self.kwargs["project_pk"]

        serializer.save(
            project_id=project_id,
            author=self.request.user
        )
    
class GuestCommentView(APIView):

    def get(self, request, token):
        guest = get_object_or_404(Guest, token=token)

        comments = Comment.objects.filter(
            project=guest.project
        ).order_by("created_at")

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, token):
        guest = get_object_or_404(Guest, token=token)

        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(
            project=guest.project,
            guest_token=guest.token
        )

        return Response(serializer.data, status=201)