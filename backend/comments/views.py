from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Comment
from .serializers import CommentSerializer
from guests.models import Guest


class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(
            project__owner=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class GuestCommentView(APIView):

    def get(self, request, token):
        guest = get_object_or_404(Guest, token=token)

        comments = Comment.objects.filter(project=guest.project).order_by("created_at")

        data = [
            {
                "id": c.id,
                "text": c.text,
                "author": c.author.username if c.author else None,
                "guest": str(c.guest_token) if c.guest_token else None,
                "created_at": c.created_at,
            }
            for c in comments
        ]

        return Response(data)

    def post(self, request, token):
        guest = get_object_or_404(Guest, token=token)

        text = request.data.get("text")

        if not text:
            return Response({"error": "Text is required"}, status=400)

        comment = Comment.objects.create(
            project=guest.project,
            guest_token=token,
            text=text
        )

        return Response({
            "id": comment.id,
            "text": comment.text,
            "guest": str(token),
            "created_at": comment.created_at
        }, status=201)