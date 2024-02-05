from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'annual_price','days_per_interval', 'created_at')


@admin.register(Subscriptions)
class SubscriptionsAdmin(admin.ModelAdmin):
    list_display = ('plan_id', 'profile_id', 'billing_cycle','starts_at', 'ends_at', 'is_active')


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description','created_at')
    ordering = ['id']

@admin.register(PlanModuleDetail)
class PlanModuleDetailAdmin(admin.ModelAdmin):
    list_display = ('plan_id', 'module_id','units_allowed', 'remarks')


@admin.register(UserModuleUnits)
class UserModuleUnitsAdmin(admin.ModelAdmin):
    list_display = ('subscription_id','module_id', 'consumed_units')
    