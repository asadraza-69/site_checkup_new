from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, \
    PasswordResetCompleteView

from site_audit.views import save_contact_details
from user_management.views import user_login, user_logout, redirection_view, signup, CustomPasswordChangeView, audit_now,is_admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/login/', user_login, name='auth_login'),
    path('accounts/logout/', user_logout, name='auth_logout'),
    path('api/save_contact_details/', save_contact_details, name='save_contact_details'),
    path('api/audit_now/', audit_now, name='audit_now'),
    path('signup/', signup, name='signup'),
    path('is_admin/', is_admin, name='is_admin'),
    path('', redirection_view, name='redirection_view'),
    path('site_audit/', include('site_audit.urls')),
    path('user_management/', include('user_management.urls')),
    path('crawler/', include('crawler.urls')),
    path('payment/', include('stripe_payment_module.urls')),
    path('subscription/', include('subscription_module.urls')),
    path('password-reset/',
         PasswordResetView.as_view(template_name='user_management/Reset_Password/reset_password.html',
                                   html_email_template_name='user_management/Reset_Password/password_reset_html_email.html',
                                   email_template_name='user_management/Reset_Password/reset_password_email.html', ),
         name='password_reset'),
    path('password-reset/done/',
         PasswordResetDoneView.as_view(template_name='user_management/Reset_Password/reset_password_done.html', ),
         name='password_reset_done'),
    path('reset/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(template_name='user_management/Reset_Password/reset_password_confirm.html', ),
         name='password_reset_confirm'),
    path('reset/done/',
         PasswordResetCompleteView.as_view(
             template_name='user_management/Reset_Password/reset_password_complete.html', ),
         name='password_reset_complete'),
    path('password_change/', CustomPasswordChangeView.as_view(), name='password_change'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
