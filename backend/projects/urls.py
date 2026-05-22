from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .views import ProjectViewSet
from tasks.views import TaskViewSet
from comments.views import CommentViewSet

router = DefaultRouter()
router.register(r'', ProjectViewSet, basename='projects')

projects_router = NestedDefaultRouter(router, r'', lookup='project')
projects_router.register(r'tasks', TaskViewSet, basename='project-tasks')

projects_router.register(r'comments', CommentViewSet, basename='project-comments')

urlpatterns = router.urls + projects_router.urls