import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from clients.models import Client
from projects.models import Project

User = get_user_model()


class Command(BaseCommand):
    help = "Seed database with test data"

    def handle(self, *args, **kwargs):
        # 1. Пользователь
        user, _ = User.objects.get_or_create(
            username="testuser",
            defaults={"email": "test@example.com"}
        )
        user.set_password("1234")
        user.save()

        self.stdout.write(self.style.SUCCESS("User created"))

        # 2. Клиенты
        clients = []
        for i in range(5):
            client = Client.objects.create(
                name=f"Client {i}",
                phone=f"+790000000{i}",
                email=f"client{i}@mail.com",
                owner=user
            )
            clients.append(client)

        self.stdout.write(self.style.SUCCESS("Clients created"))

        # 3. Проекты
        statuses = ["discussion", "active", "paused", "done"]

        for i in range(10):
            Project.objects.create(
                title=f"Project {i}",
                description="Test project",
                owner=user,
                client=random.choice(clients),
                status=random.choice(statuses),
                budget=random.randint(1000, 10000)
            )

        self.stdout.write(self.style.SUCCESS("Projects created"))