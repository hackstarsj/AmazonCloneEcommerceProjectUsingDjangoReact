from .controller.CategoryController import CategoryListView
from .controller.ProductController import ProductListView,ProductReviewListView,CreateProductReviewView,UpdateProductReviewView,ProductQuestionsListView,CreateProductQuestionsView,UpdateProductQuestionsView
from django.urls import path

urlpatterns = [
    path('categories/',CategoryListView.as_view(),name='category_list'),
    path('',ProductListView.as_view(),name='product_list'),
    # Product Review API List,Create,Update
    path('productReviews/<str:product_id>/',ProductReviewListView.as_view(),name='product_review_list'),
    path('createProductReview/<str:product_id>/',CreateProductReviewView.as_view(),name='product_review_create'),
    path('updateProductReview/<str:product_id>/<pk>/',UpdateProductReviewView.as_view(),name='product_review_update'),
    #Product Question API List,Create,Update
    path('productQuestions/<str:product_id>/',ProductQuestionsListView.as_view(),name='product_question_list'),
    path('createProductQuestion/<str:product_id>/',CreateProductQuestionsView.as_view(),name='product_question_create'),
    path('updateProductQuestion/<str:product_id>/<pk>/',UpdateProductQuestionsView.as_view(),name='product_question_update'),
]