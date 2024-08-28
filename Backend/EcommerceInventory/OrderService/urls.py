from OrderService.controller.PurchaseOrderController import CreatePurchaseOrderView,PurchaseOrderListView, PurchaseOrderView
from django.urls import path

urlpatterns=[
    path('purchaseOrder/',CreatePurchaseOrderView.as_view(),name='purchase_order'),
    path('purchaseOrder/<str:id>/',CreatePurchaseOrderView.as_view(),name='purchase_order_draft_detail'),
    path('purchaseOrderList/',PurchaseOrderListView.as_view(),name='purchase_order_list'),
    path('PurchaseOrderView/<str:id>/',PurchaseOrderView.as_view(),name='purchase_order_details')
]