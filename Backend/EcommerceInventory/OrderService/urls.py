from OrderService.controller.PurchaseOrderController import CreatePurchaseOrderView
from django.urls import path

urlpatterns=[
    path('purchaseOrder/',CreatePurchaseOrderView.as_view(),name='purchase_order')
]