from django.urls import path
from django.contrib import admin
from myapp.views import index,ulogin,uregister,error_404,error_500,ulogout,support,get_data
handler404 = 'myapp.views.error_404'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',index, name='index'),
    path('login/', ulogin, name='login'),
    path('register/', uregister, name='register'),
    path('support/', support, name='support'),
    path('error-404/', error_404, name='error_404'),
    path('error-500/', error_500, name='error_500'),
    path("logout/",ulogout,name="logout"),
]
