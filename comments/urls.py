from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CommentViewSet, GuestCommentView


router = DefaultRouter()
router.register(r"comments", CommentViewSet, basename="comments")


urlpatterns = [
    path("", include(router.urls)),
    path("guests/<uuid:token>/comments/", GuestCommentView.as_view()),
]