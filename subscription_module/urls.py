from django.urls import path
from .views import *

urlpatterns = [
    path('manage_payment_details/', manage_payment_details, name='manage_payment_details'),
    path('payment_list/', view_payment_list, name='view_payment_list'),
    path('user_consumed_units/', user_consumed_units, name='user_consumed_units'),
    path('manage_credit_card/', manage_credit_card, name='manage_credit_card'),
    path('membership/', membership, name='membership'),
    path('update_package/', update_subscription_package, name='update_subscription_package'),
    path('upgrade_subscription/', upgarde_subscription, name='upgrade_subscription'),
    path('add_website_to_plan/', add_website_to_plan, name='add_website_to_plan'),
    path('renew_subscription/', renew_subscription, name='renew_subscription'),
    path('get_plans/', get_plans, name='get_plans'),
    path('get_and_add_plan_module/', get_and_add_plan_module, name='get_and_add_plan_module'),
    path('add_plan/', add_plan, name='add_plan'),
    path('add_modules/', add_modules, name='add_modules'),
    path('get_user_consumed_units/', get_user_consumed_units, name='get_user_consumed_units'),
    path('get_all_consumed_units/', get_all_consumed_units, name='get_all_consumed_units'),
    path('add_plan_modules/', add_plan_modules, name='add_plan_modules'),
    path('edit_plans/', edit_plans, name='edit_plans'),
    path('edit_plan_module/', edit_plan_module, name='edit_plan_module'),
    path('delete_plans/', delete_plans, name= 'delete_plans'),
    path('view_consumed_units/', view_consumed_units, name='view_consumed_units'),
    path('service_subscription/', service_subscription, name='service_subscription'),
    path('check_service_subscription/', check_service_subscription, name='check_service_subscription'),


   
]
