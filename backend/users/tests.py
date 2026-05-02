from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from projects.models import Project

User = get_user_model()

class AuthTests(APITestCase):

    def test_user_registration(self):
        url = "/api/users/register/"

        data = {
            "username": "testuser1111",
            "password": "testpass123"
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_200_CREATED)
        self.assertTrue(User.objects.filter(username="testuser").exists())
        print(response.data)
        
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123"
        )

    def test_login(self):
        url = "/api/users/login/"

        data = {
            "username": "testuser1111",
            "password": "testpass123"
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
