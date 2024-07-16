from .controller.CategoryController import CategoryListView
from .controller.ProductController import ProductListView
from django.urls import path

urlpatterns = [
    path('categories/',CategoryListView.as_view(),name='category_list'),
    path('',ProductListView.as_view(),name='product_list')
]