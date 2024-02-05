from user_management.models import GlobalConfiguration, Profile
from subscription_module.models import *
from stripe_payment_module.utils import *
from stripe_payment_module.models import *
from datetime import datetime, date, timedelta 
from django.db import transaction
from django.utils import timezone
from dateutil.relativedelta import relativedelta

global con_units
global units_allowed

def plan_details(request, module_name):
    user_obj = Profile.objects.get(user_id=request.user)
    print('User: ',user_obj)
    
    subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
    print('Subscription: ',subscription)

    module = Module.objects.get(name = module_name)
    print('Module: ',module)
    

    
    units_allowed = PlanModuleDetail.objects.get(plan_id = subscription.plan_id, module_id = module).units_allowed

    print('Units Allowed: ',units_allowed)
    # plan_id = Plan.objects.get(pk = 2).name
    # print(plan_id)
    
    con_units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module).consumed_units
    print('Consumed Units: ', con_units)

    return con_units < units_allowed

def create_customer_object(user_obj,card_token = None):
    email = user_obj.email
    profile_obj =  Profile.objects.get(user = user_obj)
    if card_token :
        print('Card Token: ', card_token)
        stripe_cust_token = create_customer(email,card_token)
        with transaction.atomic():
            customer_obj = Customer.objects.create(ref_id = stripe_cust_token,card_token = card_token,i_profile =  profile_obj)
    else:
        stripe_cust_token = create_customer(email)
        with transaction.atomic():
            customer_obj = Customer.objects.create(ref_id = stripe_cust_token,i_profile =  profile_obj)
    return customer_obj



def create_user_subscription(user_obj,profile_obj,customer_obj,plan_obj,billing_cycle=None):
    response = {'status': False}
    try:
        email = user_obj.email
        current_date = timezone.now()
        time_period = 0
        pricing = 0
        if billing_cycle == 'monthly':
            time_period = 1
            pricing = plan_obj.price
        elif billing_cycle == 'yearly':
            time_period = 12
            pricing = plan_obj.annual_price
        next_date =current_date + relativedelta(months=+time_period)
        # pricing = int(plan_obj.price)*time_period
        with transaction.atomic():
            invoice_obj  = Invoice.objects.create(i_customer = customer_obj,
                i_plan=plan_obj,amount = pricing,email = email,
                from_date = current_date,to_date = next_date)
            invoice_obj.invoice_number = invoice_obj.get_invoice_number()
            invoice_obj.save()
        if plan_obj.id == 1:
            with transaction.atomic():
                invoice_obj.paid_date = current_date
                invoice_obj.remarks=  "Paid"
                invoice_obj.is_paid=  True
                invoice_obj.save()
        else:
            msg  = process_payment(invoice_obj,customer_obj)
            if msg['status']!= 'FAILED':
                payment_int_list =  msg['data']
                for amount, pay_int_token in payment_int_list.items():
                    with transaction.atomic():
                        amount = int(amount)
                        with transaction.atomic():
                            payment_obj = Payment.objects.create(i_plan = plan_obj,i_invoice = invoice_obj ,amount = amount , pay_token = pay_int_token)
                            invoice_obj.paid_date = timezone.now()
                            invoice_obj.is_paid = True
                            invoice_obj.remarks = "Paid"
                            invoice_obj.save()
                        Mutliple_payment = GlobalConfiguration.objects.get(name='Mutliple_payment').value
                        if Mutliple_payment != "False":
                            with transaction.atomic():
                                invoice_obj.multiple_payment = True
                                invoice_obj.save()
            else :
                error_msg =  msg['error']
                response = {'status': False,'error': error_msg}
                with transaction.atomic():
                    invoice_obj.retry_count +=1
                    invoice_obj.remarks += f"{error_msg}\n,"
                    invoice_obj.save()
                return response
        subscriptions_obj_qs = Subscriptions.objects.filter(profile_id=profile_obj)
        if len(subscriptions_obj_qs) != 0:
            for subscriptions_obj in subscriptions_obj_qs:
                subscriptions_obj.is_active = False
                subscriptions_obj.save()
        with transaction.atomic():
            sub_month_cycle = None
            if billing_cycle == 'monthly':
                sub_month_cycle = 'monthly'
            else:
                sub_month_cycle = 'annually'
            subscriptions_obj =  Subscriptions.objects.create(plan_id = plan_obj,
                                    profile_id=profile_obj,starts_at=current_date,
                                    ends_at = next_date,is_active =True,
                                    billing_cycle = sub_month_cycle)
        module_obj = Module.objects.all()
        with transaction.atomic():
            for i in module_obj:
                    UserModuleUnits.objects.create(subscription_id = subscriptions_obj, module_id = i, consumed_units = 0)
            user_obj.is_active =True
            user_obj.save()
        response = {'status': True,'message': 'Membership updated successfully'}
    except Exception as e:
        response = {'status': False,'error': repr(e)}
    return response

def user_extra_services(customer_obj,plan_obj,service_obj = None):
    response = {'status': False}
    try:
        email = customer_obj.i_profile.user.email
        current_date = timezone.now()
        pricing = service_obj.price
        print("pricing: ",pricing)
        with transaction.atomic():
            invoice_obj  = Invoice.objects.create(i_customer = customer_obj,
                i_plan=plan_obj,amount = pricing,email = email,
                from_date = current_date,onetime = True)
            invoice_obj.invoice_number = invoice_obj.get_invoice_number()
            invoice_obj.save()
        service_name = service_obj.name.replace("_", " ")
        service_name = ''.join(word.title() for word in service_name.split())
        print("invoice_obj: ",invoice_obj)
        msg  = process_payment(invoice_obj,customer_obj)
        if msg['status']!= 'FAILED':
            payment_int_list =  msg['data']
            for amount, pay_int_token in payment_int_list.items():
                with transaction.atomic():
                    amount = int(amount)
                    with transaction.atomic():
                        payment_obj = Payment.objects.create(i_plan = plan_obj,i_invoice = invoice_obj ,amount = amount , pay_token = pay_int_token)
                        invoice_obj.paid_date = timezone.now()
                        invoice_obj.is_paid = True
                        invoice_obj.remarks = f"Service: {service_name} Payment successful"
                        invoice_obj.save()
                    Mutliple_payment = GlobalConfiguration.objects.get(name='Mutliple_payment').value
                    if Mutliple_payment != "False":
                        with transaction.atomic():
                            invoice_obj.multiple_payment = True
                            invoice_obj.save()
            
            
            response = {
                'status': True,
                'invoice_object': invoice_obj,
                'message': f'{service_name} Payment successful'
                }
        
        else :
            error_msg =  msg['error']
            response = {'status': False,'invoice_object': invoice_obj,'error': error_msg}
            with transaction.atomic():
                invoice_obj.retry_count +=1
                invoice_obj.remarks += f"{error_msg}\n,"
                invoice_obj.save()
    except Exception as e:
        response = {'status': False,'error': e}
    return response