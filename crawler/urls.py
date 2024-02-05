from django.urls import path
from .views import *

urlpatterns = [
    path('crawl/', crawl, name='crawl'),
    path('crawl_data/', crawl_data, name='crawl_data'),
    path('content/', content, name='content'),
    path('images_type/', images_type, name='images_type'),
    path('total_crawled_pages/', total_crawled_pages, name='total_crawled_pages')
]
