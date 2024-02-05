from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import *
from user_management.models import *
from dateutil.relativedelta import relativedelta
from .models import *
from django.contrib.auth.decorators import login_required
from user_management.decorators import isAdmin
from subscription_module.models import *
# Create your views here.

def get_public_key(request):
    if request.method == "GET":
        PUB_KEY = get_stripe_pub_key()
        return JsonResponse({"key":PUB_KEY})

@login_required
def view_invoice_list(request):
    return render(request, 'stripe_payment_module/view_invoice_list.html')

@isAdmin
# @login_required
def view_all_invoices(request):
    if request.method == 'GET' and request.user.is_staff:
        return render(request, 'stripe_payment_module/view_all_invoices.html')
    else:
        return render(request, 'site_audit/dashboard.html')

@isAdmin
# @login_required
def view_all_payments(request):
    if request.method == 'GET' and request.user.is_staff:
        return render(request, 'stripe_payment_module/view_all_payments.html')
    else:
        return render(request, 'site_audit/dashboard.html')

@login_required
def add_card(request):
    plan_id = request.GET.get('plan_id')
    context = {'plan_id' : plan_id}
    return render(request, 'stripe_payment_module/add_card.html', context)

@login_required
def card_info(request):
    try:
        user = request.user
        customer_obj =  Customer.objects.get(i_profile__user =user)
        if customer_obj.card_token:
            SEC_KEY = get_stripe_pvt_key()
            stripe.api_key = SEC_KEY
            card_info = stripe.Token.retrieve(
                customer_obj.card_token
            )
        else:
            return JsonResponse({"status":False,"error":"user card is not found"})
        if card_info:
            return JsonResponse({"status":True,"data":card_info,"fullname":f"{user.first_name} {user.last_name}"})
        else:
            return JsonResponse({"status":False,"error":"card token is not associated with user"})
    except Exception as e:
        print("Error :",e)
        return JsonResponse({"status":False,"error":"user card is not found"})

@csrf_exempt
def create_card_token(request):
    if request.method == "POST":
        number = request.POST.get('number')
        exp_month = request.POST.get('exp_month')
        exp_year = request.POST.get('exp_year')
        cvc = request.POST.get('cvc')
        response = create_card_token_utils(number, exp_month, exp_year, cvc)
        return JsonResponse(response)
    return JsonResponse({"error":"Invalid Request"})

@csrf_exempt
def create_stripe_customer(request):
    if request.method == "POST":
        card_token = request.POST.get('card_token')
        customer_ref_id = create_customer(request.user.email,card_token)
        if customer_ref_id:
            response = {
                "status":True,
                "message":"Card Registered",
                }
        else:
            response = {
                "status":False,
                "error":"Try again"
                }
        return JsonResponse(response)
    return JsonResponse({"status":False,"error":"Invalid Request"})

@login_required
def get_user_invoices(request):
    print("get_user_invoices")
    response = {"status" : False}
    if request.method == "GET":
        user = request.user
        list_of_user_invoices = get_user_invoices_utils(user)
        response['status'] = True if list_of_user_invoices else False
        if response['status']:
            response['data'] = list_of_user_invoices
        else:
            response['error'] = "No user invoices"
        return JsonResponse(response)
    return JsonResponse(response)

@login_required
def get_all_invoices(request):
    response = {'status' : False}
    if request.method == 'GET':
        print("get_all_invoices")
        user = request.user
        args = 'all_invoices'
        list_of_all_invoices = get_all_invoices_utils(user,args)
        response['data'] = list_of_all_invoices
        response['status'] = True
    
    return JsonResponse(response)

@login_required
def get_all_paid_invoices(request):
    response = {'status' : False}
    if request.method == 'GET':
        print("get_all_paid_invoices")
        user = request.user
        args = 'all_paid_invoices'
        list_of_all_paid_invoices = get_all_invoices_utils(user,args)
        response['data'] = list_of_all_paid_invoices
        response['status'] = True

        # print("list_of_user_invoices: ",list_of_user_invoices)    
    return JsonResponse(response)

@login_required
def get_all_unpaid_invoices(request):
    response = {'status' : False}
    if request.method == 'GET':
        print("get_all_unpaid_invoices")
        user = request.user
        args = 'all_unpaid_invoices'
        list_of_all_unpaid_invoices = get_all_invoices_utils(user,args)
        response['data'] = list_of_all_unpaid_invoices
        response['status'] = True
        # print("list_of_user_invoices: ",list_of_user_invoices)    
    return JsonResponse(response)


@login_required
def get_user_payments(request):
    print("get_user_payments")
    response = {"status" : False}
    if request.method == "GET":
        user = request.user
        list_of_user_payments = get_user_payment_utils(user)
        response['status'] = True if list_of_user_payments else False
        if response['status']:
            response['data'] = list_of_user_payments
        else:
            response['error'] = "No user payments available"
        return JsonResponse(response)
    return JsonResponse(response)

@login_required
def get_all_payments(request):
    response = {'status' : False}
    if request.method == 'GET':
        print("get_all_payments")
        user = request.user
        list_of_all_payments = get_all_payment_utils(user)
        response['data'] = list_of_all_payments
        response['status'] = True
        # print("list_of_user_invoices: ",list_of_user_payments)    
    return JsonResponse(response)

@login_required
def view_subscription(request):
    response = {'status' : False}
    if request.method == 'GET':
        print("view_subscription")
        # profile_obj = Profile.objects.get(user_id =  request.user)
        # subs_obj = Subscriptions.objects.filter(profile_id = profile_obj).values()
        # subscription = subs_obj.latest('starts_at')
        # subscription = subscription.values()
        user = request.user
        list_of_user_subscriptions = get_user_subscription(user)
        response['data'] = list_of_user_subscriptions
        response['status'] = True
    return JsonResponse(response)

@login_required
@csrf_exempt
def user_update_card(request):
    
    if request.method == "POST":
        user = request.user
        card_token = request.POST.get('card_token')
        print("card_token",card_token)
        if card_token:
            try:
                customer_obj =  Customer.objects.get(i_profile__user = user)
            except Customer.DoesNotExist:
                profile_obj = Profile.objects.get(user = user)
                customer_obj =  Customer.objects.create(i_profile = profile_obj)
            customer_ref_id = create_customer(cust_email = customer_obj.i_profile.user.email,card_token = card_token)
            customer_obj.ref_id = customer_ref_id
            customer_obj.card_token = card_token
            customer_obj.save()
            return JsonResponse({"status": True, "message": "Card updated successfully"})
        else:
            return JsonResponse({"status": False,"error":"Card token is not found"})

    return JsonResponse({"status": False,"error": "Invalid Request"})

@login_required
@csrf_exempt
def update_subscription(request):
    response = {"status" : False}
    user = request.user
    current_date = timezone.now()
    next_date = timezone.now() + relativedelta(months = +1)
    try:
        profile_obj = Profile.objects.get(user=user)
        subs_obj = Subscriptions.objects.get(profile_id = profile_obj, is_active = True)
        subs_obj.cancelled_at = current_date
        # subs_obj.is_active = False
        subs_obj.save()
        # plan_obj = Plan.objects.get(price = 0)
        # new_subs_obj = Subscriptions.objects.create(profile_id = profile_obj, billing_cycle = 'monthly', plan_id = plan_obj, starts_at = current_date, ends_at = next_date, is_active = True)
        response['status'] = True
    except Exception as e:
        print('Exception' , repr(e))
        response['error'] = repr(e)

    return JsonResponse(response)


@csrf_exempt
@login_required
def create_customer_api(request):
    if request.method == "POST":
        card_token = request.POST.get('card_token')
        if card_token:
            customer_ref_id = create_customer(request.user.email,card_token)
            try:
                c_Check = Customer.objects.get(i_profile = request.user.profile)
                if c_Check:
                    c_Check.delete()
                    customer_obj = Customer.objects.create(
                    card_token=card_token,
                    ref_id = customer_ref_id,
                    i_profile = request.user.profile
                    )
            except Customer.DoesNotExist:
                customer_obj = Customer.objects.create(
                    card_token=card_token,
                    ref_id = customer_ref_id,
                    i_profile = request.user.profile
                    )
            if customer_ref_id and customer_obj:
                response = {
                    "status":True,
                    "message":"Card Registered",
                    }
            else:
                response = {
                    "status":False,
                    "error":"Try again later"
                    }
        else:
            response = {
                    "status":False,
                    "error":"Token missing"
                    }
        print("create_customer_api: Response: " , response)
        return JsonResponse(response)
    return JsonResponse({"status":False,"error":"Invalid Request"})



@login_required
def check_user_card(request):
    resp = {"status": False}
    user = request.user
    try:
        customer_obj =  Customer.objects.get(i_profile__user = user)
        if customer_obj.card_token is not None:
            resp["status"] = True 
    except Customer.DoesNotExist:
        customer_obj = None
    return JsonResponse(resp)