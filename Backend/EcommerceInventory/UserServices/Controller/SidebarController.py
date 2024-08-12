import json

from django.urls import get_resolver
from EcommerceInventory.Helpers import convertModeltoJSON, list_project_urls, renderResponse
from UserServices.models import ModuleUrls, Modules, UserPermissions
from rest_framework import generics
from django.core.serializers import serialize
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from EcommerceInventory.permission import IsSuperAdmin


class ModuleView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        permission_module_ids=[]
        #Return all Modules for Super Admin and Top Domain Level User
        if request.user.role=='Super Admin' or request.user.domain_user_id.id==request.user.id:
            menus=Modules.objects.filter(is_menu=True,parent_id=None,is_active=True).order_by('display_order')
        else:
            permission_module_ids=UserPermissions.objects.filter(user=request.user.id,is_permission=True).values_list('module_id',flat=True)
            menus=Modules.objects.filter(is_menu=True,parent_id=None,is_active=True).filter(id__in=permission_module_ids).order_by('display_order')
        
        serialized_menus=serialize('json',menus)
        serialized_menus=json.loads(serialized_menus)

        cleaned_menus=[]
        for menu in serialized_menus:
            menu['fields']['id']=menu['pk']
            if request.user.role=='Super Admin' or request.user.domain_user_id.id==request.user.id:
                menu['fields']['submenus']=Modules.objects.filter(parent_id=menu['pk'],is_active=True,is_menu=True).order_by('display_order').values('id','module_name','module_icon','is_menu','is_active','parent_id','display_order','module_url','module_description')
            else:
                menu['fields']['submenus']=Modules.objects.filter(parent_id=menu['pk'],is_active=True,is_menu=True).filter(id__in=permission_module_ids).order_by('display_order').values('id','module_name','module_icon','is_menu','is_active','parent_id','display_order','module_url','module_description')
            cleaned_menus.append(menu['fields'])

        if request.user.role=='Super Admin':
            cleaned_menus.append({'id':0,'module_name':'Manage Module Urls','module_icon':'','is_menu':True,'is_active':True,'parent_id':None,'display_order':0,'module_url':'/manage/moduleUrls','module_description':'Module Urls','submenus':[]})

        return renderResponse(data=cleaned_menus,message='All Modules',status=200)
    

class ModuleUrlsListAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsSuperAdmin]

    def get(self,request):
        urls=ModuleUrls.objects.all()
        urlJson=convertModeltoJSON(urls)

        urlconf=get_resolver()
        urlsProject=list_project_urls(urlconf.url_patterns)

        modules=Modules.objects.all()
        modulesJson=convertModeltoJSON(modules)
        modulesJson.insert(0,{'id':0,'module_name':'Skip Permission'})

        return renderResponse(data={'moduleUrls':urlJson,'project_urls':urlsProject,'modules':modulesJson},message='All Module Urls',status=200)

    def post(self,request):
        data=request.data
        for item in data:
            if item['url']!=None:
                if 'id' in item and item['id'] and item['id']!=0:
                    moduleUrls=ModuleUrls.objects.get(id=item['id'])
                    moduleUrls.url=item['url']
                else:
                    moduleUrls=ModuleUrls(url=item['url'])
                    
                if item['module']!=0 and item['module']!=None:
                    moduleUrls.module=Modules.objects.get(id=item['module'])
                moduleUrls.save()
        return renderResponse(data={},message='Module Urls Updated',status=200)
