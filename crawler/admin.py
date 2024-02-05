from django.contrib import admin
from .models import *


@admin.register(SiteScrapyData)
class SiteScrapyDataAdmin(admin.ModelAdmin):
    list_display = ('i_website', 'status', 'created_on')

@admin.register(SiteProcessData)
class SiteProcessDataAdmin(admin.ModelAdmin):
    list_display = ('project', 'process_data', 'created_on')


@admin.register(WebsitePages)
class WebsitePagesAdmin(admin.ModelAdmin):
    list_display = ('i_website', 'webpage', 'is_crawled')
    search_fields = ('i_website', 'webpage')