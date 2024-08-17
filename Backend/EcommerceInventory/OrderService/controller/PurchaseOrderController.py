from OrderService.models import PurchaseOrder, PurchaseOrderItems, PurchaseOrderLogs
from EcommerceInventory.Helpers import getDynamicFormFields, renderResponse
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import serializers


class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=PurchaseOrderItems
        fields="__all__"

class PurchaseOrderSerializer(serializers.ModelSerializer):
    items=PurchaseOrderItemSerializer(many=True,source='po_id_purchase_order_items')
    class Meta:
        model=PurchaseOrder
        fields="__all__"
    
    def create(self,validated_data):
        items_data=validated_data.pop('po_id_purchase_order_items')
        purchaseOrder=PurchaseOrder.objects.create(**validated_data)
        for item_data in items_data:
            item_data.update({'created_by_user_id':validated_data.get('created_by_user_id')})
            item_data.update({'domain_user_id':validated_data.get('domain_user_id')})
            PurchaseOrderItems.objects.create(po_id=purchaseOrder,**item_data)

        purchaseOrderLog=PurchaseOrderLogs(po_id=purchaseOrder,additional_details=[{"key":"STATUS","value":validated_data.get("status")}],comment='Purchase Order Created with Status '+validated_data.get('status'),created_by_user_id=validated_data.get('created_by_user_id'),domain_user_id=validated_data.get('domain_user_id'))
        purchaseOrderLog.save()
        return purchaseOrder

class CreatePurchaseOrderView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        poFields=getDynamicFormFields(PurchaseOrder(),request.user.domain_user_id.id,skip_related=['supplier_id'],skip_fields=['shipping_cancelled_amount','shipping_cancelled_tax_amount','approved_at','cancelled_at','received_at','returned_at','last_updated_by_user_id','status','approved_by_user_id','cancelled_by_user_id','received_by_user_id','returned_by_user_id','cancelled_reason'])
        poItemFields=getDynamicFormFields(PurchaseOrderItems(),request.user.domain_user_id.id,skip_related=['product_id'],skip_fields=['quantity_received','quantity_cancelled','quantity_returned','amount_returned','amount_cancelled','shipping_cancelled_amount','shipping_cancelled_tax_amount','approved_at','cancelled_at','received_at','returned_at','po_id','status','approved_by_user_id','cancelled_by_user_id','received_by_user_id','returned_by_user_id','cancelled_reason'])
        return renderResponse(data={'poFields':poFields,'poItemFields':poItemFields},message='Purchase Order Fields',status=200)

    def post(self,request):
        data=request.data
        data.update({'created_by_user_id':request.user.id})
        data.update({'domain_user_id':request.user.domain_user_id.id})
        data.update({'last_updated_by_user_id':request.user.id})
        serializer=PurchaseOrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return renderResponse(data=serializer.data,message='Purchase Order Created',status=201)
        return renderResponse(data=serializer.errors,message='Error Creating Purchase Order',status=400)