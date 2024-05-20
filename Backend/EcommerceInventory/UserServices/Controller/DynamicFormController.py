from EcommerceInventory.Helpers import getDynamicFormFields, getDynamicFormModels
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.apps import apps

class DynamicFormController(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,modelName):
        if modelName not in getDynamicFormModels():
            return Response({'error':'Model not found'},status=404)
        
        model = getDynamicFormModels()[modelName]
        model_class=apps.get_model(model)

        if model_class is None:
            return Response({'error':'Model not found'},status=404)
        

        model_instance = model_class()
        fields=getDynamicFormFields(model_instance,request.user.domain_user_id)
        return Response({'data':fields,'message':'Form fields fetched successfully'})