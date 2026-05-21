from rest_framework import serializers
from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    projectsCount = serializers.IntegerField(source="projects.count", read_only=True)

    class Meta:
        model = Client
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "telegram",
            "note",
            "created_at",
            "updated_at",
            "projectsCount",
        ]