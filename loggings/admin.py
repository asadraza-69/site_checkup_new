from django.contrib import admin
from .models import *


@admin.register(SystemLogs)
class SystemLogsAdmin(admin.ModelAdmin):
    list_display = ('action_by', 'action_by_id', 'action_date', 'action_desc')
    search_fields = ('action_by', 'action_by_id', 'action_date', 'action_desc')
