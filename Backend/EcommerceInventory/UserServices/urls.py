from django.urls import path
from .Controller import AuthController,UserController

urlpatterns = [
    path('login/',AuthController.LoginAPIView.as_view(),name='login'),
    path('signup/',AuthController.SignupAPIView.as_view(),name='signup'),
    path('publicApi/',AuthController.PublicAPIView.as_view(),name='publicapi'),
    path('protectedApi/',AuthController.ProtectedAPIView.as_view(),name='protectedapi'),
    path('superadminurl/',AuthController.SuperAdminCheckApi.as_view(),name='superadminurl'),
    path('users/',UserController.UserListView.as_view(),name='user_list'),
    path('userlist/',UserController.UserWithFilterListView.as_view(),name='user_list_filter'),
    path('updateuser/<pk>/',UserController.UpdateUsers.as_view(),name='update_user'),
    path('userpermission/<pk>/',UserController.UserPermissionsView.as_view(),name='user_permission'),
]
