from EcommerceInventory.Helpers import renderResponse
from UserServices.models import Users
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=['id','username','first_name','last_name','email','profile_pic']

class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self,request):
        users=Users.objects.filter(domain_user_id=request.user.domain_user_id.id)
        serializer=UserSerializer(users,many=True)
        return renderResponse(data=serializer.data,message="All Users",status=200)
