from django.apps import apps
from EcommerceInventory.Helpers import getExludeFields, getSuperAdminDynamicFormModels, renderResponse
from EcommerceInventory.permission import IsSuperAdmin
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.serializers import serialize
import json

class SuperAdminDynamicFormController(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsSuperAdmin]

    def post(self, request,modelName):
                #Checking if Model Exist in Our Dynamic Form Models
        if modelName not in getSuperAdminDynamicFormModels():
            return renderResponse(data='Model Not Exist',message='Model Not Exist',status=404)
        
        #Getting the Model Name from Dynamic Form Models
        model=getSuperAdminDynamicFormModels()[modelName]
        #Getting the Model Class from the Model Name
        model_class=apps.get_model(model)

        #Checking if Model Class Exist
        if model_class is None:
            return renderResponse(data='Model Not Found',message='Model Not Found',status=404)
        
        #Getting the Model Fields Info
        fields_info=model_class._meta.fields
        #Getting the Model Fields Name
        model_fields={field.name for field in fields_info}
        #Getting the Excluded Fields
        exclude_fields=getExludeFields()

        #Checking the Required Fields are in the Model Data
        required_fields=[field.name for field in fields_info if not field.null and field.default is not None and field.name not in exclude_fields]

        #matching with validation for fields not exist in Post Data
        missing_fields=[field for field in required_fields if field not in request.data]
        #If Missing Fields Exist
        if missing_fields:
            return renderResponse(data=[f'The Following field in required : {field}' for field in missing_fields],message='Validation Error',status=400)
        
        #Creating a Copy of Post Data for Manipulation
        fields=request.data.copy()

        #Filtering the Post Data Fields by Model Fields and Eliminating the Extra Fields
        fieldsdata={key:value for key,value in fields.items() if key in model_fields}
        #All the Model Fields Data
        print(model_fields)
        #All the Post Data Fields
        print(fields.items())
        #Santizing the Post Data Fields by model fields data and eliminating the extra fields
        print(fieldsdata.items())

        #Assigning Foreign key instance for ForeignKey Fields in the Post Data by getting the instance of the related model by the ID
        for field in fields_info:
            if field.is_relation and field.name in fieldsdata and isinstance(fieldsdata[field.name],int):
                related_model=field.related_model
                try:
                    fieldsdata[field.name]=related_model.objects.get(id=fieldsdata[field.name])
                except related_model.DoesNotExist:
                    return renderResponse(data=f'{field.name} Relation Not Exist found',message=f'{field.name} Relation Not Exist found',status=404)

        #Creating the Model Instance and Saving the Data in the Database
        model_instace=model_class.objects.create(**fieldsdata)

        #Serializing Data
        serialized_data=serialize('json',[model_instace])
        #Converting Serialized Data to JSON
        model_json=json.loads(serialized_data)
        #Getting the first object of the JSON
        response_json=model_json[0]['fields']
        response_json['id']=model_json[0]['pk']
        #Returning the Response
        return renderResponse(data=response_json,message='Data saved successfully')
