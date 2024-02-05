from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (('i_profile', 'ref_id', 'card_token'))
    

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = (('invoice_number','i_customer',"amount", 'created_on', 'is_paid',"from_date","to_date"))
    ordering = ['-id']
    search_fields = ("invoice_number","amount", 'created_on', 'is_paid',"from_date","to_date")
    
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("i_invoice","amount","pay_token")

@admin.register(ExtraServices)
class ExtraServicesAdmin(admin.ModelAdmin):
    list_display = ("name","price")
    ordering = ['id']
    search_fields = ("name","price")


@admin.register(ExtraServicesMapping)
class ExtraServicesMappingAdmin(admin.ModelAdmin):
    list_display = ("i_extraservices","i_invoice","is_paid")
    ordering = ['id']
    search_fields = ("i_extraservices","i_invoice","is_paid")
