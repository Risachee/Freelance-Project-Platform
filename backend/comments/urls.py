from django.urls import path
from .views import CommentViewSet, GuestCommentView
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter

router = DefaultRouter()

projects_router = NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'comments', CommentViewSet, basename='project-comments')

urlpatterns = [
    path("guests/<uuid:token>/comments/", GuestCommentView.as_view()),
]

urlpatterns += router.urls
urlpatterns += projects_router.urls