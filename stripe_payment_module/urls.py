from django.urls import path
from .views import *


urlpatterns = [
    path('card_info/',card_info , name='card_info'),
    path('cardtoken/',create_card_token , name='create_card_token'),
    path('get_public_key/',get_public_key , name='get_public_key'),
    path('view_invoice_list/',view_invoice_list , name='view_invoice_list'),
    path('get_user_invoices/',get_user_invoices , name='get_user_invoices'),
    path('get_user_payments/',get_user_payments , name='get_user_payments'),
    path('view_subscription/', view_subscription, name='view_subscription'),
    path('user_update_card/',user_update_card , name='user_update_card'),
    path('update_subscription/', update_subscription, name='update_subscription'),
    path('add_card/', add_card, name='add_card'),
    path('check_user_card/', check_user_card, name='check_user_card'),
    path('create_customer/', create_customer_api, name='create_customer_api'),
    path('view_all_invoices/', view_all_invoices, name='view_all_invoices'),
    path('view_all_payments/', view_all_payments, name='view_all_payments'),
    path('get_all_invoices/', get_all_invoices, name='get_all_invoices'),
    path('get_all_paid_invoices/', get_all_paid_invoices, name='get_all_paid_invoices'),
    path('get_all_unpaid_invoices/', get_all_unpaid_invoices, name='get_all_unpaid_invoices'),
    path('get_all_payments/', get_all_payments, name='get_all_payments')

]