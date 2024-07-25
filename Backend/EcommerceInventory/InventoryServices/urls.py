from django.urls import path
from .Controller.WarehouseController import WarehouseListView,UpdateWarehouseView

urlpatterns=[
    path('warehouse/', WarehouseListView.as_view(), name='warehouse_list'),
    path('toggleWarehouse/<pk>/', UpdateWarehouseView.as_view(), name='update_warehouse'),
]