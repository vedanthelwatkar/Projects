from django.contrib import admin
from django.urls import path, include
from inventory_management.views import item_list, item_detail,register, login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('api/items/', item_list, name='item-list'),
    path('api/items/<int:pk>/', item_detail, name='item-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
