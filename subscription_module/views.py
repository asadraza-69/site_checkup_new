from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from django.shortcuts import render
from .utils import *
from .models import *
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from user_management.decorators import isAdmin
from django.forms.models import model_to_dict
from stripe_payment_module.models import ExtraServices
import json
# Create your views here.
@login_required
def manage_payment_details(request):
    return render(request, 'subscription_module/manage_payment_details.html')

@login_required
def user_consumed_units(request):
    return render(request, 'subscription_module/user_consumed_units.html')

@login_required
def view_payment_list(request):
    return render(request, 'subscription_module/view_payment_list.html')

# @login_required
@isAdmin
def view_consumed_units(request):
    if request.method == 'GET' :
        return render(request, 'subscription_module/view_consumed_units.html')
    else:
        return render(request, 'site_audit/dashboard.html')
@login_required
def manage_credit_card(request):
    return render(request, 'subscription_module/manage_credit_card.html')

# @login_required
@isAdmin
def add_plan_modules(request):
    if request.method == 'GET' :
        return render(request, 'subscription_module/add_plan_modules.html')
    else:
        return render(request, 'site_audit/dashboard.html')

@login_required
def membership(request):
    return render(request, 'subscription_module/membership.html')

# @login_required
@isAdmin
def add_modules(request):
    if request.method == 'GET' :
        return render(request, 'subscription_module/add_modules.html')
    else:
        return render(request, 'site_audit/dashboard.html')

@login_required
def upgarde_subscription(request):
    subscription_obj = Subscriptions.objects.get(profile_id = request.user.profile, is_active = True)
    plan_obj = Plan.objects.get(pk = subscription_obj.plan_id.pk)
    context = {'active_plan_price' : plan_obj.price}
    print(context)
    return render(request, 'subscription_module/upgrade_subscription.html', context)

@login_required
def renew_subscription(request):
    return render(request, 'subscription_module/renew_subscription.html')

@login_required
def add_plans(request):
    return render(request, 'subscription_module/add_plans.html')

# @login_required
@isAdmin
def edit_plans(request):
    if request.method == 'GET' :
        return render(request, 'subscription_module/edit_plans.html')
    else:
        return render(request, 'site_audit/dashboard.html')

@csrf_exempt
def update_subscription_package(request):
    response ={"status": False,"error": "Invalid request type"}
    if request.method == 'POST':
        plan_id  = request.POST.get('plan_id')
        billing_cycle = request.POST.get('billing_cycle')
        user_obj = request.user
        plan_obj = Plan.objects.get(pk = plan_id)
        profile_obj =  Profile.objects.get(user = user_obj)
        customer_obj =  Customer.objects.get(i_profile = profile_obj)
        response = create_user_subscription(user_obj,profile_obj,customer_obj,plan_obj, billing_cycle)
        return JsonResponse(response)
    return JsonResponse(response)

@login_required
def add_website_to_plan(request):
    plan_id = request.POST.get('plan_id')
    website_url = request.POST.get('website_url')
    context = {'plan_id': plan_id, 'website_url' : website_url}

    return JsonResponse(context)


def get_plans(request):
    response = {"status": False}
    if request.method == 'GET':
        data =[]
        plan_qs = Plan.objects.all()
        # subs_obj = Subscriptions.objects.get(profile_id__user = request.user, is_active = True)
        # active_plan_price = subs_obj.plan_id.price
        # response['active_plan_price'] = active_plan_price
        if not request.user.is_anonymous :
            try:
                subs_obj = Subscriptions.objects.get(profile_id__user = request.user, is_active = True)
                active_plan_price = subs_obj.plan_id.price
                response['active_plan_price'] = active_plan_price
                response['subscription'] = subs_obj.plan_id.id
                
            except Subscriptions.DoesNotExist:
                response['subscription'] = None
        else:
            response['subscription'] = None
            response['active_plan_price'] = None
        if plan_qs:
            for plan in plan_qs:
                data_dict = {
                    "id": plan.id,
                    "name" : plan.name,
                    "price" : plan.price,
                    "days_per_interval" : plan.days_per_interval,
                    "description" : plan.description,
                    }
                data.append(data_dict)
            response['status'] = True
            response['data'] = data
        else:
            response['error'] = 'No Plans available'
        return JsonResponse(response)
    else:
        response['error'] = 'Invalid request type try GET'
        return JsonResponse(response)

@csrf_exempt
def get_and_add_plan_module(request):
    response = {'status': False}
    if request.method == 'GET': 
        module_obj = Module.objects.all().values()
        response['status'] = True
        response['data'] = list(module_obj)
        return JsonResponse(response)
    elif request.method == 'POST':
        module_name = request.POST.get('module_name')
        module_description = request.POST.get('module_description')
        with transaction.atomic():
            module_obj , created = Module.objects.get_or_create(name= module_name ,description = module_description)
        if created:
            print("created: ",created)
            response['status'] = True
            response['data'] = model_to_dict(module_obj)
        else:
            print("created: ",created)
            response['status'] = False
            response['error'] = 'Module already exists'
        return JsonResponse(response)
    else:
        response['error'] = 'Invalid request'
        return JsonResponse(response)

@login_required
@csrf_exempt
def add_plan(request):
    response = {'status': False}
    if request.method == 'POST':
        body  = json.loads(request.body.decode("utf-8"))
        print("Response body: ",body)
        plan_name = body['name']
        plan_price = body['price']
        plan_annual_price = body['annual_price']
        plan_days_per_interval = body['days_per_interval']
        plan_description = body['description']
        module_details = body['module_details']
        plan_obj = Plan.objects.filter(name= plan_name)
        if not plan_obj:
            with transaction.atomic():
                plan_obj , created = Plan.objects.get_or_create(
                            name= plan_name ,price = plan_price,
                            annual_price = plan_annual_price,
                            days_per_interval = plan_days_per_interval,
                            description = plan_description
                            )
            if created:
                print("created: ",created)
                for dict in module_details:
                    for pk , value in dict.items():
                        module_obj = Module.objects.get(pk=pk)
                        with transaction.atomic():
                            PlanModuleDetail_obj = PlanModuleDetail.objects.create(
                                                                        plan_id = plan_obj,
                                                                        module_id  =module_obj,
                                                                        units_allowed = value["unit"],
                                                                        remarks = value["remarks"]
                                                                        )
                response['status'] = True
                # response['data'] = model_to_dict(plan_obj)
                response['message'] = plan_obj.name+" Has been Created Successfully"
            else:
                print("created: ",created)
                response['status'] = False
                response['error'] = 'plan already exists'
        else:
            response['status'] = False
            response['error'] = 'plan name already exists'
        
        return JsonResponse(response)
    else:
        response['error'] = 'Invalid request'
        return JsonResponse(response)

@csrf_exempt
@login_required
def get_user_consumed_units(request):
    response = {'status': False}
    if request.method == 'GET':
        user = request.user
        user_active_subscription = Subscriptions.objects.get(profile_id__user = user, is_active = True)
        UserModuleUnits_qs =  UserModuleUnits.objects.filter(subscription_id = user_active_subscription).values()
        for UserModuleUnitsobj in UserModuleUnits_qs:
            sub_obj =  Subscriptions.objects.get(pk =  UserModuleUnitsobj['subscription_id_id'])
            UserModuleUnitsobj["subscription_id_id"] = sub_obj.plan_id.name
            module_obj = Module.objects.get(pk = UserModuleUnitsobj['module_id_id'])
            UserModuleUnitsobj["module_id_id"] = module_obj.name
            # print("Module: ",module_obj)
            PlanModuleDetail_obj= PlanModuleDetail.objects.filter(plan_id = user_active_subscription.plan_id ,module_id = module_obj)
            if PlanModuleDetail_obj:
                # print("PlanModuleDetail_obj: ",PlanModuleDetail_obj[0])
                UserModuleUnitsobj["total_units"] = PlanModuleDetail_obj[0].units_allowed
            #this is new implementation
        response['status'] = True
        response['data'] = list(UserModuleUnits_qs)
    else:
        response['error'] = 'Invalid request type'
    return JsonResponse(response)


@csrf_exempt
@login_required
def get_all_consumed_units(request):
    response = {'status': False}
    user_module_units_list = []
    data = {}
    if request.method == 'GET':
            user_active_subscription = Subscriptions.objects.filter(is_active = True)
            for active_subscription in user_active_subscription:
                # print("sub : ",active_subscription)
                module_obj = Module.objects.all()
                for module in module_obj:
                    user_module_units_qs  = UserModuleUnits.objects.filter(subscription_id = active_subscription, module_id = module)
                    for user_module_unit in user_module_units_qs:
                        data = {
                        'user_id' : user_module_unit.subscription_id.profile_id.user.email,
                        'subscription_id' : user_module_unit.subscription_id.plan_id.name,
                        'module_id' : user_module_unit.module_id.name,
                        'consumed_units' : user_module_unit.consumed_units,
                        }
                        user_module_units_list.append(data)

            response['status'] = True
            response['data'] = user_module_units_list
            
    else:
        response['error'] = 'Invalid request type'
    return JsonResponse(response)

@csrf_exempt
@login_required
def edit_plan_module(request):
    response = {'status': False}
    data = []
    if request.method == 'GET':
        try:
            plans_obj = Plan.objects.all()
            try:
                for plan in plans_obj:
                    module_obj = PlanModuleDetail.objects.filter(plan_id = plan).values()
                    for module_detail in module_obj:
                        module = Module.objects.get(pk = module_detail['module_id_id'])
                        module_detail['module_id_id'] = module.name
                    data_dict = {
                        'plan_id' : plan.id,
                        'plan_name' : plan.name,
                        'plan_price' : plan.price,
                        'plan_annual_price' : plan.annual_price,
                        'plan_days_per_interval' : plan.days_per_interval,
                        'plan_description': plan.description,
                        'plan_module' : list(module_obj)
                    }
                    data.append(data_dict)
                
                response['status'] = True
                response['data'] = data
            
            except PlanModuleDetail.DoesNotExist:
                print("Plan Module Detail Does not exist")
                response['error'] = 'No Plan Module Detail Found.'

                
        except Plan.DoesNotExist:
            print('Plans does not exist')
            response['error'] = 'No Plans Found.'

    elif request.method == 'POST':
        body  = json.loads(request.body.decode("utf-8"))
        plan_id = body['plan_id']
        plan_name = body['name']
        plan_price = body['price']
        plan_annual_price = body['annual_price']
        plan_days_per_interval = body['days_per_interval']
        plan_description = body['description']
        module_details = body['module_details']

        plan_obj = Plan.objects.get(pk= plan_id)
        with transaction.atomic():
            plan_obj.name = plan_name
            plan_obj.price = plan_price
            plan_obj.annual_price = plan_annual_price
            plan_obj.days_per_interval = plan_days_per_interval
            plan_obj.description = plan_description
            # plan_obj.save()


            for i in module_details:
                print(i['id'])
                print('plan_id: ', plan_id)
                module_obj = PlanModuleDetail.objects.get(plan_id = plan_id, pk = i['id'])
                module_obj.units_allowed = i['unit']
                module_obj.remarks = i['remarks']
                module_obj.save()
            
            plan_obj.save()

        print("plan_name: ",plan_name)
        print("plan_price: ",plan_price)
        print("plan_annual_price: ",plan_annual_price)
        print("plan_days_per_interval: ",plan_days_per_interval)
        print("plan_description: ",plan_description)
        # print("module_details: ",module_details)

        response['status'] = True


    return JsonResponse(response)

@csrf_exempt
@login_required
def delete_plans(request):
    response = {'status' : False}

    if request.method == 'POST':
        try:
            # body  = json.loads(request.body.decode("utf-8"))
            # plan_id = body['plan_id']
            plan_id = request.POST.get('plan_id')

            plan_obj = Plan.objects.get(pk = plan_id)

            module_detail_obj = PlanModuleDetail.objects.filter(plan_id = plan_obj)

            for module in module_detail_obj:
                module.delete()
            
            plan_obj.delete()

            response['status'] = True

        except Exception as e:
            print("Delete Plans Error: ", repr(e))
            response['error'] = repr(e)
    return JsonResponse(response)

def service_subscription(request):
    response ={'status': False}
    user = request.user
    customer_obj = Customer.objects.get(i_profile__user=user)
    sub_obj = Subscriptions.objects.get(profile_id__user = user,is_active = True)
    plan_obj = sub_obj.plan_id
    service_obj = ExtraServices.objects.get(name = "google_analytics")
    try:
        user_service_mapping = ExtraServicesMapping.objects.get(
        i_extraservices = service_obj,
        i_invoice__i_customer__i_profile__user=user,
        is_paid = True
        )
        service_name = service_obj.name.replace("_", " ")
        service_name = ''.join(word.title() for word in service_name.split())
        response = {
            'status': True,
            'message': f"Service: {service_name} is already subscribed"
        }
    except ExtraServicesMapping.DoesNotExist:
        response = user_extra_services(customer_obj,plan_obj,service_obj)
        print("Response extra_services: ", response)
        i_invoice_obj = response.pop('invoice_object', None)
        if response['status'] == True:
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
    return JsonResponse(response)

def check_service_subscription(request):
    response ={'status': False}
    user = request.user
    service_obj = ExtraServices.objects.get(name = "google_analytics")
    try:
        user_service_mapping = ExtraServicesMapping.objects.get(
        i_extraservices = service_obj,
        i_invoice__i_customer__i_profile = user.profile,
        is_paid = True
        )
        response ={'status': True}
    except ExtraServicesMapping.DoesNotExist:
        pass
    return JsonResponse(response)