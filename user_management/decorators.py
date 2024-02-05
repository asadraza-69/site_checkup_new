from functools import wraps
# from django.contrib import messages
import requests ,json
from django.shortcuts import redirect
from django.contrib.auth.decorators import user_passes_test
from user_management.models import GlobalConfiguration


def check_recaptcha(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        request.recaptcha_is_valid = None
        if request.method == 'POST':
            recaptcha_response = request.POST.get('captcha_response')
            print('recaptcha_response:', recaptcha_response)
            try:
                recaptcha_secret_key = GlobalConfiguration.objects.get(name='google_recaptcha_secret_key').value
            except GlobalConfiguration.DoesNotExist:
                print('google_recaptcha_secret_key not found in GlobalConfiguration model')
                recaptcha_secret_key = ''
            data = {
                'secret': recaptcha_secret_key,
                'response': recaptcha_response
            }
            r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
            result = r.json()
            if result['success']:
                request.recaptcha_is_valid = True
            else:
                request.recaptcha_is_valid = False
                # messages.error(request, 'Invalid reCAPTCHA. Please try again.')
        return view_func(request, *args, **kwargs)
    return _wrapped_view


def isAdmin(view_func):
    def check_superuser(user):
        if user.is_authenticated and (user.is_superuser or user.is_staff):
            return True
        else:
            return False
    
    decorated_view_func = user_passes_test(check_superuser, login_url='/site_audit/dashboard/', redirect_field_name=None)
    return decorated_view_func(view_func)