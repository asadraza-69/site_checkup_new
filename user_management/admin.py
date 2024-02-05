from django.contrib import admin
from .models import *


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'is_verified')
    search_fields = ('user__username',)


@admin.register(GlobalConfiguration)
class GlobalConfigurationAdmin(admin.ModelAdmin):
    list_display = ('name', 'value')


@admin.register(ProfileOTP)
class ProfileOTPAdmin(admin.ModelAdmin):
    list_display = ('i_profile', 'otp', 'expiry_time')
