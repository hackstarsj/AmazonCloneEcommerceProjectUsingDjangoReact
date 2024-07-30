from EcommerceInventory.Helpers import CommonListAPIMixin, CommonListAPIMixinWithFilter, CustomPageNumberPagination, createParsedCreatedAtUpdatedAt, renderResponse
from UserServices.models import Users
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import serializers
from rest_framework import generics

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=['id','username','first_name','last_name','email','profile_pic']

@createParsedCreatedAtUpdatedAt
class UserSerializerWithFilters(serializers.ModelSerializer):
    date_joined=serializers.DateTimeField(format="%dth %B %Y, %H:%M", read_only=True)
    last_login=serializers.DateTimeField(format="%dth %B %Y, %H:%M", read_only=True)
    added_by_user_id=serializers.SerializerMethodField()
    domain_user_id=serializers.SerializerMethodField()
    class Meta:
        model=Users
        fields=['id', 'first_name', 'last_name', 'date_joined', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'country', 'profile_pic', 'account_status', 'role', 'dob', 'username', 'social_media_links', 'addition_details', 'language', 'departMent', 'designation', 'time_zone', 'last_login', 'last_device', 'last_ip', 'currency', 'domain_name', 'plan_type', 'created_at', 'updated_at', 'domain_user_id', 'added_by_user_id']

    def get_domain_user_id(self,obj):
        return "#"+str(obj.domain_user_id.id) +" "+obj.domain_user_id.username if obj.domain_user_id!=None else ''
    
    def get_added_by_user_id(self,obj):
        return "#"+str(obj.added_by_user_id.id) +" "+obj.added_by_user_id.username if obj.added_by_user_id!=None else ''

class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self,request):
        users=Users.objects.filter(domain_user_id=request.user.domain_user_id.id)
        serializer=UserSerializer(users,many=True)
        return renderResponse(data=serializer.data,message="All Users",status=200)

class UserWithFilterListView(generics.ListAPIView):
    serializer_class = UserSerializerWithFilters
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        queryset=Users.objects.filter(domain_user_id=self.request.user.domain_user_id.id)
        return queryset
    
    @CommonListAPIMixinWithFilter.common_list_decorator(UserSerializerWithFilters)
    def list(self,request,*args,**kwargs):
        return super().list(request,*args,**kwargs)


class UpdateUsers(generics.UpdateAPIView):
    serializer_class = UserSerializerWithFilters
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Users.objects.filter(domain_user_id=self.request.user.domain_user_id.id,id=self.kwargs['pk'])

    def perform_update(self,serializer):
        serializer.save()
