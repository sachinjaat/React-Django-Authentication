from django.urls import path
from .views import *

urlpatterns = [
    #user register url
    path('user/create', CreateUserView.as_view()),
]