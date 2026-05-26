from rest_framework import serializers
from .models import Project
from clients.models import Client
from clients.serializers import ClientSerializer

class ProjectSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(),
        source="client",
        write_only=True
    )
    status_display = serializers.CharField(
        source="get_status_display",
        read_only=True
    )
    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        guest = obj.guest_set.first()
        return str(guest.token) if guest else None

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("owner", "status_display")