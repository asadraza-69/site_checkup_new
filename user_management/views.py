import phonenumbers
from django.contrib import messages
from django.contrib.auth import logout, update_session_auth_hash, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.views import PasswordChangeView
from django.db import transaction
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from loggings.utils import save_system_logs
from site_audit.models import SiteAuditProject
from user_management.country_languages import COUNTRY_LANGUAGES
from user_management.decorators import check_recaptcha
from user_management.models import Profile, GlobalConfiguration
from stripe_payment_module.models import *
from stripe_payment_module.utils import *
from subscription_module.utils import *
from subscription_module.models import Plan, Subscriptions ,Module ,UserModuleUnits
from datetime import datetime, date, timedelta 
from django.utils import timezone


@login_required
def user_list(request):
    template_name = 'user_management/user_list.html'
    return render(request, template_name)

@login_required
def is_admin(request):
    response = {"status" : False}
    user = request.user
    if user.is_staff:
        response["status"] = True
    return JsonResponse(response)


@csrf_exempt
@check_recaptcha
def signup(request):
    response = {'status': True}
    if request.method == 'POST':
        try:
            # recaptcha_is_valid = request.recaptcha_is_valid
            # print('recaptcha_is_valid:', recaptcha_is_valid)
            # if recaptcha_is_valid:
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            email = request.POST.get('email')
            password = request.POST.get('password')
            phone_number = request.POST.get('phone_number')
            website_url = request.POST.get('website_url')
            billing_cycle = request.POST.get('billing_cycle','monthly')
            ga_status = request.POST.get('ga_status','false')
            # billing_cycle = billing_cycle if billing_cycle else 'monthly'
            try:
                card_token = request.POST.get('card_token')
                print("card_token",card_token)
            except Exception as e:
                card_token = None
            try:
                plan_id = request.POST.get('plan_id')
                plan_obj =  Plan.objects.get(pk=plan_id)
            except  Exception as e:
                plan_obj = Plan.objects.get(name = 'Free Plan')
            print('phone_number:', phone_number)
            if not phone_number.startswith('+1'):
                response["status"] = False
                response["error"] = "+1 country code is allowed"
                return JsonResponse(response)
            user = User.objects.filter(email=email)
            if user:
                response["status"] = False
                response["error"] =  'Email already exists'
                return JsonResponse(response)

            with transaction.atomic():
                user_role = 'user'
                ph_number = phonenumbers.parse(phone_number)
                # is_valid = phonenumbers.is_possible_number(ph_number)
                is_valid = phonenumbers.is_valid_number(ph_number)
                print('phone_number is_valid:', is_valid)
                if is_valid:
                    user_obj = User.objects.create(first_name=first_name, last_name=last_name, email=email,
                                                   username=email,is_active =False)
                    user_obj.set_password(password)
                    user_obj.save()
                    profile_obj = Profile.objects.create(user=user_obj, role=user_role, phone_number=phone_number)
                    customer_obj = create_customer_object(user_obj,card_token)
                    resp_cus = create_user_subscription(user_obj,profile_obj,customer_obj,plan_obj,billing_cycle)
                    print(resp_cus)
                    if resp_cus['status'] == False:
                        response["status"] = False
                        response["error"] = "Error Occured while processing payment"
                        user_obj.delete()
                        return JsonResponse(response)
                    else:
                        if ga_status.lower() == 'true':
                            service_obj = ExtraServices.objects.get(name = "google_analytics")
                            print("service_obj: ",service_obj)
                            print("customer_obj: ",customer_obj)
                            res = user_extra_services(customer_obj,plan_obj,service_obj)
                            print("Response extra_services: ", res)
                            i_invoice_obj = res['invoice_object']
                            if res['status'] == True:
                                ExtraServicesMapping.objects.create(
                                    i_extraservices = service_obj,
                                    i_invoice = i_invoice_obj,
                                    is_paid = True
                                )
                            else:
                                ExtraServicesMapping.objects.create(
                                    i_extraservices = service_obj,
                                    i_invoice = i_invoice_obj,
                                    is_paid = False
                                )
                        else:
                            pass
                        response['status'] = True
                        response['website_url'] = website_url
                        if plan_obj.name == 'Free Plan':
                            response['msg'] = str(plan_obj) + ' Subscription Created'
                        else:
                            response['msg'] = 'Payment Successful, ' + str(plan_obj) +' Subscription Created'
                else:
                    response["status"] = False
                    response["error"] = "Please enter valid phone number"
            # else:
            #     response = {"status": False, "error": "Invalid reCAPTCHA, Please try again"}
        except Exception as e:
            print("Exception:", repr(e))
            number_parse_exp = 'NumberParseException'
            number_field_exp = 'LookupError'
            if number_parse_exp in repr(e) or number_field_exp in repr(e):
                response["status"] =  False
                response["error"]  = "Please enter valid phone number"
            else:
                response["status"] = False
                response["error"] = "Something went wrong, please try again",
                response["exception"] =  repr(e)
        return JsonResponse(response)
    else:
        try:
            recaptcha_site_key = GlobalConfiguration.objects.get(name='google_recaptcha_site_key').value
        except GlobalConfiguration.DoesNotExist:
            print('google_recaptcha_site_key not found in GlobalConfiguration model')
            recaptcha_site_key = ''
        context = {'recaptcha_site_key': recaptcha_site_key}
        template_name = 'user_management/signup.html'
        return render(request, template_name, context)


@login_required
def main_dashboard(request):
    return render(request, 'user_management/dashboard.html', {})


@login_required
def user_logout(request):
    log_msg = "%s logged out of the system" % request.user.first_name
    save_system_logs(log_msg, request.user.email)
    logout(request)
    return HttpResponseRedirect('/accounts/login/')


def get_user(email):
    try:
        user = User.objects.get(email=email.lower())
        return user.username
    except User.DoesNotExist:
        return ''

def get_username(user):
    username = user.username
    if user.get_short_name():
        username = user.get_short_name()
    return username

@csrf_exempt
def user_login(request):
    context = {}
    if request.method == 'POST':
        redirect_to = request.POST.get("next", None)
        print('redirect_to:', redirect_to)
        email = request.POST.get('email', None)
        password = request.POST.get('password', None)
        website_url = request.POST.get('website_url', None)
        username = get_user(email)
        user = authenticate(username=email, password=password)
        print("user %s" %user)
        if user and user.is_active:
            try:
                profile_obj = Profile.objects.get(user=user)
            except Profile.DoesNotExist:
                profile_obj = Profile.objects.create(user=user)

           # below code is to check or create default subscription of free plan
            try:
                plan_obj = Plan.objects.get(name = 'Free Plan')
                subs_obj = Subscriptions.objects.get(profile_id = profile_obj, is_active = True)
            except Subscriptions.DoesNotExist:
                subs_obj = Subscriptions.objects.create(plan_id = plan_obj, profile_id = profile_obj, billing_cycle = timezone.now(), starts_at = timezone.now(), ends_at = timezone.now(), renewed_at = timezone.now(), cancelled_at = timezone.now(), created_at = timezone.now(), expired_at = timezone.now(), is_active = True)
            try:
                module_obj = Module.objects.all()
                for i in module_obj:
                    UserModuleUnits.objects.get(subscription_id = subs_obj, module_id = i)
            except UserModuleUnits.DoesNotExist:
                for i in module_obj:
                    UserModuleUnits.objects.get_or_create(subscription_id = subs_obj, module_id = i)
           
            login(request, user)
            log_msg = "%s logged in the system" % request.user.first_name
            save_system_logs(log_msg, email)

            user_projects = SiteAuditProject.objects.filter(created_by=user)
            # redirect_url = '/site_audit/dashboard/' if user_projects else '/site_audit/add_website/'
            redirect_to = '/site_audit/dashboard/'
            # if not redirect_to:
            #     redirect_to = redirect_url
            username = get_username(user)
            if website_url is not None and website_url:
                context = {
                    'user' : username,
                    'website_url': website_url,
                    'status'  : True,
                    'redirect_url' : redirect_to
                }
            else:
                if user_projects:
                    context = {
                        'user' : username,
                        'status'  : False,
                        'redirect_url' : redirect_to
                    }
                else:
                    context = {
                        'user' : username,
                        'status'  : False,
                        'redirect_url' : '/site_audit/add_website/'
                    }
            print("website_url: ",website_url)
            print("context: ",context)
            return JsonResponse(context)          
        else:
            try:
                # user = User.objects.get(username=username, password=password)
                user = User.objects.get(email=email, password=password)
                if not user.is_active:
                    context = {
                        'status'  : False,
                        'redirect_url' : '/accounts/login/',
                        "errors": "User is inactive."
                    }
                # else:
                #     user_projects = SiteAuditProject.objects.filter(created_by=user)
                #     login(request, user)
                #     log_msg = "%s logged in the system" % request.user.first_name
                #     save_system_logs(log_msg, email)
                #     if user_projects:
                #         context = {
                #             'user' : request.user.first_name,
                #             'status'  : False,
                #             'redirect_url' : '/site_audit/dashboard/'
                #         }
                #     else:
                #         context = {
                #             'user' : request.user.first_name,
                #             'status'  : False,
                #             'redirect_url' : '/site_audit/add_website/'
                #         }
            except User.DoesNotExist:
                context = {
                        'status'  : False,
                        'redirect_url' : '/accounts/login/',
                        "errors": "Please Enter A Correct Email And Password. Note That Both Fields May Be Case-Sensitive."
                    }
                # context = {"errors": "Please Enter A Correct Email And Password. Note That Both Fields May Be Case-Sensitive."}
        # return render(request, 'user_management/login_form.html', context)
        return JsonResponse(context)
    else:
        try:
            recaptcha_site_key = GlobalConfiguration.objects.get(name='google_recaptcha_site_key').value
        except GlobalConfiguration.DoesNotExist:
            print('google_recaptcha_site_key not found in GlobalConfiguration model')
            recaptcha_site_key = ''
        context ={'recaptcha_site_key': recaptcha_site_key}
        print('context ', context)
        return render(request, 'user_management/login_form.html', context)


class CustomPasswordChangeView(PasswordChangeView):
    template_name = 'user_management/profile_password_change_form.html'
    success_url = reverse_lazy('seo_checkup')

    def form_valid(self, form):
        form.save()
        update_session_auth_hash(self.request, form.user)
        messages.success(self.request, 'Your password has been changed.')
        return super().form_valid(form)


def redirection_view(request):
    return HttpResponseRedirect('/site_audit/dashboard/')


def get_country_languages(request):
    response = {'status': False, 'errors': ''}
    try:
        response['country_languages'] = COUNTRY_LANGUAGES
        response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['errors'] = repr(e)
    return JsonResponse(response)


@csrf_exempt
def audit_now(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        phone_number = request.POST.get('phone_number')
        email = request.POST.get('email')
        website = request.POST.get('website')
        print('first_name:', first_name)
        print('phone_number:', phone_number)
        print('email:', email)
        print('website:', website)

        try:
            api_url = GlobalConfiguration.objects.get(name='api_url').value
        except GlobalConfiguration.DoesNotExist:
            print('api_url not found in GlobalConfiguration model')
            api_url = ''

        if api_url:
            redirect_url = f"{api_url}/signup?first_name={first_name}&website={website}&phone_number={phone_number}&" \
                           f"email={email}"

            return HttpResponseRedirect(redirect_url)
        else:
            response = {'status': False, 'error': 'api_url not found in GlobalConfiguration model'}
            return JsonResponse(response)
    else:
        # try:
        #     api_url = GlobalConfiguration.objects.get(name='api_url').value
        # except GlobalConfiguration.DoesNotExist:
        #     print('api_url not found in GlobalConfiguration model')
        #     api_url = ''
        #
        # recaptcha_site_key = 'test'
        # first_name = 'taha'
        # phone_number = '123456'
        # email = 'test@gmail.com'
        # website = 'test.com'
        # redirect_url = f"{api_url}/signup?first_name={first_name}&website={website}&phone_number={phone_number}&" \
        #                f"email={email}&recaptcha_site_key={recaptcha_site_key}"
        #
        # return HttpResponseRedirect(redirect_url)

        response = {'status': False, 'error': 'invalid request'}
        return JsonResponse(response)
