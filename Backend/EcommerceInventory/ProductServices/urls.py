from .controller.CategoryController import CategoryListView
from django.urls import path

urlpatterns = [
    path('categories/',CategoryListView.as_view(),name='category_list')
]