from EcommerceInventory.permission import IsSuperAdmin
from EcommerceInventory.Helpers import renderResponse
from UserServices.models import Users
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate

class SignupAPIView(APIView):
    def post(self,request):
        username=request.data.get('username')
        email=request.data.get('email')
        password=request.data.get('password')
        profile_pic=request.data.get('profile_pic')

        emailCheck=Users.objects.filter(email=email)
        if emailCheck.exists():
            return renderResponse(data='Email Already Exists',message='Email Already Exists',status=status.HTTP_400_BAD_REQUEST)
        
        usernameCheck=Users.objects.filter(username=username)
        if usernameCheck.exists():
            return renderResponse(data='Username Already Exists',message='Username Already Exists',status=status.HTTP_400_BAD_REQUEST)

        if username is None or email is None or password is None:
            return renderResponse(data='Please provide both username and password and Email',message='Please provide both username and password and Email',status=status.HTTP_400_BAD_REQUEST)
        
        user=Users.objects.create_user(username=username,email=email,password=password,profile_pic=profile_pic)
        if request.data.get('domain_user_id'):
            user.domain_user_id=Users.objects.get(id=request.data.get('domain_user_id'))
        user.save()
        
        refresh = RefreshToken.for_user(user)
        access =refresh.access_token
        access['username'] = user.username
        access['email'] = user.email
        access['profile_pic'] = user.profile_pic

        return Response({'access':str(access),'refresh':str(refresh),'message':'User Created Successfully'},status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is None or password is None:
            return renderResponse(data='Please provide both username and password',message='Please provide both username and password',status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            access =refresh.access_token
            access['username'] = user.username
            access['email'] = user.email
            access['profile_pic'] = user.profile_pic

            return Response({
                'refresh': str(refresh),
                'access': str(access),
            })
        else:
            return renderResponse(data='Invalid credentials',message='Invalid credentials',status=status.HTTP_400_BAD_REQUEST)
    def get(self,request):
        return renderResponse(data='Please Use Post Method to Login',message='Please Use Post Method to Login',status=status.HTTP_400_BAD_REQUEST)
    
class PublicAPIView(APIView):
    def get(self, request):
        return renderResponse(data='This is a publicly accessible API',message='This is a publicly accessible API',status=status.HTTP_400_BAD_REQUEST)

class ProtectedAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return renderResponse(data='This is a protected API. You can access this because you are authenticated.',message='This is a protected API. You can access this because you are authenticated.',status=status.HTTP_400_BAD_REQUEST)

class SuperAdminCheckApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsSuperAdmin]

    def get(self, request):
        return renderResponse(data='This is a Super Admin API. You can access this because you are authenticated.',message='This is a protected API. You can access this because you are authenticated.',status=status.HTTP_400_BAD_REQUEST)
