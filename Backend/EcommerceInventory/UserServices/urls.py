from django.urls import path
from .Controller import AuthController

urlpatterns = [
    path('login/',AuthController.LoginAPIView.as_view(),name='login'),
    path('signup/',AuthController.SignupAPIView.as_view(),name='signup'),
    path('publicApi/',AuthController.PublicAPIView.as_view(),name='publicapi'),
    path('protectedApi/',AuthController.ProtectedAPIView.as_view(),name='protectedapi'),
]
