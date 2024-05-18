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

        if username is None or email is None or password is None:
            return Response({'error':'Please provide both username and password and Email'},status=status.HTTP_400_BAD_REQUEST)
        
        user=Users.objects.create_user(username=username,email=email,password=password,profile_pic=profile_pic)
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
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

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
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    def get(self,request):
        return Response({'message':'Please Use Post Method to Login'})
    
class PublicAPIView(APIView):
    def get(self, request):
        return Response({'message': 'This is a publicly accessible API'})

class ProtectedAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'This is a protected API. You can access this because you are authenticated.'})