from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import TaskViewSet, UserTaskViewSet
from projects.views import ProjectViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'tasks', UserTaskViewSet, basename='tasks')  # ← добавила

projects_router = NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'tasks', TaskViewSet, basename='project-tasks')

urlpatterns = router.urls + projects_router.urls