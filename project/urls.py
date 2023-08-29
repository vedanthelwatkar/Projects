from django.contrib import admin
from django.urls import path
from pollapp.views import home,create,result,vote,delete
from auapp.views import uhome,signup,cp,ulogout

urlpatterns = [
    path('admin/', admin.site.urls),
    path("home",home,name="home"),
    path("create",create,name="create"),
    path("vote/<int:pk>/",vote,name="vote"),
    path("result/<int:pk>/",result,name="result"),
    path("",uhome,name="uhome"),
    path("signup",signup,name="signup"),
    path("cp",cp,name="cp"),
    path("ulogout",ulogout,name="ulogout"),
    path("delete/<int:pk>/",delete,name="delete")
]

