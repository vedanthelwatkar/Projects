from django.urls import path
from langbot.views import home_view,bot_view,delete_vectorstore_view

urlpatterns = [
    path('', home_view),
    path('bot/', bot_view, name='bot'),
    path('delete_vectorstore/', delete_vectorstore_view, name='delete_vectorstore'),
]
