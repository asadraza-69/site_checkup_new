from django.contrib.auth.views import PasswordResetView, PasswordResetCompleteView, PasswordResetConfirmView, \
    PasswordResetDoneView
from django.urls import path
from .views import *

urlpatterns = [
    path('get_country_languages/', get_country_languages, name='get_country_languages'),
    path('audit_now/', audit_now, name='audit_now'),
    # path('users_listview/', user_listview, name='user-listview'),
    # path('main_dashboard/', main_dashboard, name='main_dashboard'),
    # path('get_country_states/', get_country_states, name='get_country_states'),
    # path('get_countries/', get_countries, name='get_countries'),
    # path('get_country_languages/', get_country_languages, name='get_country_languages'),
    path('password-reset/', PasswordResetView.as_view(template_name='user_management/Reset_Password/reset_password.html',
         html_email_template_name='user_management/Reset_Password/password_reset_html_email.html',
         email_template_name='user_management/Reset_Password/reset_password_email.html',), name='password_reset'),
    path('password-reset/done/',
         PasswordResetDoneView.as_view(template_name='user_management/Reset_Password/reset_password_done.html',),
         name='password_reset_done'),
    path('reset/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(template_name='user_management/Reset_Password/reset_password_confirm.html',),
         name='password_reset_confirm'),
    path('reset/done/',
         PasswordResetCompleteView.as_view(template_name='user_management/Reset_Password/reset_password_complete.html',),
         name='password_reset_complete'),
    path('password_change/', CustomPasswordChangeView.as_view(), name='password_change'),
]
