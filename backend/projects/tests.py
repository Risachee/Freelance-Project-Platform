from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from projects.models import Project

User = get_user_model()


class ProjectTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123"
        )

        self.client.force_authenticate(user=self.user)
    
    def test_create_project(self):
        url = "/api/projects/"

        data = {
            "title": "Test Project",
            "description": "Some description"
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 1)

        project = Project.objects.first()
        self.assertEqual(project.owner, self.user)
    
    def test_user_sees_only_own_projects(self):
        other_user = User.objects.create_user(
            username="other",
            password="123"
        )

        Project.objects.create(
            title="Other project",
            owner=other_user
        )

        Project.objects.create(
            title="My project",
            owner=self.user
        )

        url = "/api/projects/"

        response = self.client.get(url)

        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "My project")
    
    def test_unauthorized_access(self):
        self.client.force_authenticate(user=None)

        url = "/api/projects/"

        response = self.client.get(url)

        self.assertEqual(response.status_code, 401)