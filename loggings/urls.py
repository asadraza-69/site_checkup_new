from django.urls import path
from .views import *

urlpatterns = [
    path('system_logs_list/', system_logs_list, name='system_logs_list'),
    path('system_logs_listview/', system_logs_listview, name='system_logs_listview'),
]
