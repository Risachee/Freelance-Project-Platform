from django.urls import path
from comments.views import GuestCommentView
from guests.views import GuestProjectView, CreateGuestLinkView

urlpatterns = [
    path('guests/<uuid:token>/project/', GuestProjectView.as_view()),
    path('guests/<uuid:token>/comments/', GuestCommentView.as_view()),

    path('projects/<int:project_id>/guest-link/', CreateGuestLinkView.as_view()),
]