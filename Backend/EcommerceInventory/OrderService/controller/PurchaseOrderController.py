from OrderService.models import PurchaseOrder, PurchaseOrderItems, PurchaseOrderLogs
from EcommerceInventory.Helpers import CommonListAPIMixin, CustomPageNumberPagination, getDynamicFormFields, renderResponse
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import serializers


class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    sku=serializers.CharField(source='product_id.sku',read_only=True)
    product_name=serializers.CharField(source='product_id.name',read_only=True)
    class Meta:
        model=PurchaseOrderItems
        fields="__all__"

class PurchaseOrderListSerializer(serializers.ModelSerializer):
    warehouse_id=serializers.CharField(source='warehouse_id.name',read_only=True)
    supplier_id=serializers.CharField(source='supplier_id.email',read_only=True)
    last_updated_by_user_id=serializers.CharField(source='last_updated_by_user_id.username',read_only=True)
    created_by_user_id=serializers.CharField(source='created_by_user_id.username',read_only=True)
    domain_user_id=serializers.CharField(source='domain_user_id.username',read_only=True)
    approved_by_user_id=serializers.CharField(source='approved_by_user_id.username',read_only=True)
    cancelled_by_user_id=serializers.CharField(source='cancelled_by_user_id.username',read_only=True)
    received_by_user_id=serializers.CharField(source='received_by_user_id.username',read_only=True)
    returned_by_user_id=serializers.CharField(source='returned_by_user_id.username',read_only=True)
    class Meta:
        model=PurchaseOrder
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
            item_data.update({'domain_user_id':validated_data.get('domain_user_id')})
            PurchaseOrderItems.objects.create(po_id=purchaseOrder,**item_data)

        purchaseOrderLog=PurchaseOrderLogs(po_id=purchaseOrder,additional_details=[{"key":"STATUS","value":validated_data.get("status")}],comment='Purchase Order Created with Status '+validated_data.get('status'),created_by_user_id=validated_data.get('created_by_user_id'),domain_user_id=validated_data.get('domain_user_id'))
        purchaseOrderLog.save()
        return purchaseOrder
    
    def update(self,instance,validated_data):
        items_data=validated_data.pop('po_id_purchase_order_items')
        instance=super().update(instance,validated_data)
        items=[item_data.get('id') for item_data in items_data if 'id' in item_data]
        PurchaseOrderItems.objects.filter(po_id=instance).exclude(id__in=items).delete()

        for item_data in items_data:
            item_data.update({'domain_user_id':validated_data.get('domain_user_id')})

            if 'po_id' in item_data:
                item_data.pop('po_id')

            if 'id' in item_data:
                poItem=PurchaseOrderItems.objects.filter(id=item_data.get('id'))
                po_item_serializer=PurchaseOrderItemSerializer(poItem.first(),data=item_data)
                if po_item_serializer.is_valid():
                    po_item_serializer.save()
            else:
                PurchaseOrderItems.objects.create(po_id=instance,**item_data)

        purchaseOrderLog=PurchaseOrderLogs(po_id=instance,additional_details=[{"key":"STATUS","value":validated_data.get("status")}],comment='Purchase Order Created with Status '+validated_data.get('status'),created_by_user_id=validated_data.get('created_by_user_id'),domain_user_id=validated_data.get('domain_user_id'))
        purchaseOrderLog.save()
        return instance

class CreatePurchaseOrderView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,id=None):
        po=PurchaseOrder.objects.filter(domain_user_id=request.user.domain_user_id.id,id=id).first() if id else PurchaseOrder()
        poItems=PurchaseOrderItems.objects.filter(po_id=id) if id else []
        poItems=PurchaseOrderItemSerializer(poItems,many=True).data
        try:
            poData={'supplier_id':po.supplier_id.id,'supplier_email':po.supplier_id.email} if po.supplier_id else {}
        except:
            poData={}
        poFields=getDynamicFormFields(po,request.user.domain_user_id.id,skip_related=['supplier_id'],skip_fields=['shipping_cancelled_amount','shipping_cancelled_tax_amount','approved_at','cancelled_at','received_at','returned_at','last_updated_by_user_id','status','approved_by_user_id','cancelled_by_user_id','received_by_user_id','returned_by_user_id','cancelled_reason'])
        poItemFields=getDynamicFormFields(PurchaseOrderItems(),request.user.domain_user_id.id,skip_related=['product_id'],skip_fields=['quantity_received','quantity_cancelled','quantity_returned','amount_returned','amount_cancelled','shipping_cancelled_amount','shipping_cancelled_tax_amount','approved_at','cancelled_at','received_at','returned_at','po_id','status','approved_by_user_id','cancelled_by_user_id','received_by_user_id','returned_by_user_id','cancelled_reason'])
        return renderResponse(data={'poData':poData,'poItems':poItems,'poFields':poFields,'poItemFields':poItemFields},message='Purchase Order Fields',status=200)

    def post(self,request,id=None):
        data=request.data
        data.update({'created_by_user_id':request.user.id})
        data.update({'domain_user_id':request.user.domain_user_id.id})
        data.update({'last_updated_by_user_id':request.user.id})
        if id:
            po=PurchaseOrder.objects.filter(domain_user_id=request.user.domain_user_id.id,id=id).first()
            if po:
                serializer=PurchaseOrderSerializer(po,data=data)
            else:
                return renderResponse(data={},message='Purchase Order Not Found',status=404)
        else:
            serializer=PurchaseOrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return renderResponse(data=serializer.data,message='Purchase Order Created',status=201)
        return renderResponse(data=serializer.errors,message='Error Creating Purchase Order',status=400)
    

class PurchaseOrderListView(generics.ListAPIView):
    serializer_class = PurchaseOrderListSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        queryset=PurchaseOrder.objects.filter(domain_user_id=self.request.user.domain_user_id.id)
        return queryset
    
    @CommonListAPIMixin.common_list_decorator(PurchaseOrderListSerializer)
    def list(self,request,*args,**kwargs):
        return super().list(request,*args,**kwargs)
