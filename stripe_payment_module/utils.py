import stripe ,yaml
from django.conf import settings
from user_management.models import GlobalConfiguration
from .models import *
from subscription_module.models import *

def get_user_invoices_utils(user):
    list_of_user_invoices = []
    profile_obj = Profile.objects.get(user=user)
    customer_obj =  Customer.objects.get(i_profile = profile_obj)
    invoice_obj = Invoice.objects.filter(i_customer = customer_obj).values().order_by('-pk')
    for invoice in invoice_obj:
        list_of_user_invoices.append(invoice)
    for invoice in list_of_user_invoices:
        invoice['i_customer_id'] = user.first_name+" "+user.last_name
        # print(invoice['i_plan_id'])
        plan_obj =  Plan.objects.get(pk = invoice["i_plan_id"])
        invoice['i_plan_id'] = plan_obj.name
    return list_of_user_invoices


def get_all_invoices_utils(user, args):
    if args == 'all_invoices':
        list_of_all_invoices = []
        invoice_obj = Invoice.objects.all().values().order_by('-pk')

        for invoice in invoice_obj:
            # invoice['i_customer_id'] = invoice.email
            invoice['i_customer_id'] = invoice['email']
            list_of_all_invoices.append(invoice)
        
        for invoice in list_of_all_invoices:
            # invoice['i_customer_id'] = 
            plan_obj = Plan.objects.get(pk = invoice['i_plan_id'])
            invoice['i_plan_id'] = plan_obj.name
        print('list_of_all_invoices', list_of_all_invoices)
        return list_of_all_invoices
    elif args == 'all_paid_invoices':
        list_of_all_paid_invoices = []
        invoice_obj = Invoice.objects.filter(is_paid = True).values().order_by('-pk')

        for invoice in invoice_obj:
            # invoice['i_customer_id'] = invoice.email
            invoice['i_customer_id'] = invoice['email']
            list_of_all_paid_invoices.append(invoice)
        
        for invoice in list_of_all_paid_invoices:
            # invoice['i_customer_id'] = 
            plan_obj = Plan.objects.get(pk = invoice['i_plan_id'])
            invoice['i_plan_id'] = plan_obj.name
        print('list_of_all_paid_invoices', list_of_all_paid_invoices)
        return list_of_all_paid_invoices
    elif args == 'all_unpaid_invoices':
        list_of_all_unpaid_invoices = []
        invoice_obj = Invoice.objects.filter(is_paid = False).values().order_by('-pk')

        for invoice in invoice_obj:
            # invoice['i_customer_id'] = invoice.email
            invoice['i_customer_id'] = invoice['email']
            list_of_all_unpaid_invoices.append(invoice)
        for invoice in list_of_all_unpaid_invoices:
            # invoice['i_customer_id'] = 
            plan_obj = Plan.objects.get(pk = invoice['i_plan_id'])
            invoice['i_plan_id'] = plan_obj.name
        print('list_of_all_unpaid_invoices', list_of_all_unpaid_invoices)
        return list_of_all_unpaid_invoices




# def get_all_paid_invoices_utils(user):
#     list_of_all_paid_invoices = []
#     invoice_obj = Invoice.objects.filter(is_paid = True).values().order_by('-pk')

#     for invoice in invoice_obj:
#         # invoice['i_customer_id'] = invoice.email
#         invoice['i_customer_id'] = invoice['email']
#         list_of_all_paid_invoices.append(invoice)
#     print(list_of_all_paid_invoices)
#     for invoice in list_of_all_paid_invoices:
#         # invoice['i_customer_id'] = 
#         plan_obj = Plan.objects.get(pk = invoice['i_plan_id'])
#         invoice['i_plan_id'] = plan_obj.name
#     return list_of_all_paid_invoices


# def get_all_unpaid_invoices_utils(user):
#     list_of_all_unpaid_invoices = []
#     invoice_obj = Invoice.objects.filter(is_paid = False).values().order_by('-pk')

#     for invoice in invoice_obj:
#         # invoice['i_customer_id'] = invoice.email
#         invoice['i_customer_id'] = invoice['email']
#         list_of_all_unpaid_invoices.append(invoice)
#     for invoice in list_of_all_unpaid_invoices:
#         # invoice['i_customer_id'] = 
#         plan_obj = Plan.objects.get(pk = invoice['i_plan_id'])
#         invoice['i_plan_id'] = plan_obj.name
#     return list_of_all_unpaid_invoices
    
    


def get_user_payment_utils(user):
    list_of_user_payment = []
    profile_obj = Profile.objects.get(user=user)
    customer_obj =  Customer.objects.get(i_profile = profile_obj)
    invoice_obj = Invoice.objects.filter(i_customer = customer_obj,is_paid = True)
    for invoice in invoice_obj:
        payment_obj = Payment.objects.filter(i_invoice = invoice).values().order_by('-pk')
        for payments in payment_obj:
            # payments["i_customer_id"] = customer_obj.i_profile.user.email
            payments["i_invoice_id"] = invoice.invoice_number
            plan_obj = Plan.objects.get(pk=payments["i_plan_id"])
            payments["i_plan_id"] = plan_obj.name
            list_of_user_payment.append(payments)
    return list_of_user_payment


def get_all_payment_utils(user):
    list_of_all_payment = []
    # customer_obj =  Customer.objects.get(i_profile = profile_obj)
    invoice_obj = Invoice.objects.filter(is_paid = True)
    for invoice in invoice_obj:
        payment_obj = Payment.objects.filter(i_invoice = invoice).values().order_by('-pk')
        for payments in payment_obj:
            # payments["i_customer_id"] = customer_obj.i_profile.user.email
            payments["i_invoice_id"] = invoice.invoice_number
            plan_obj = Plan.objects.get(pk=payments["i_plan_id"])
            payments["i_plan_id"] = plan_obj.name
            list_of_all_payment.append(payments)
    return list_of_all_payment


def get_stripe_config():
    config_path = settings.YAML_FILE_PATH
    s_config_dict = {}
    with open(config_path) as file:
        s_config_dict = yaml.load(file, Loader=yaml.FullLoader)
    return s_config_dict


def get_stripe_pub_key():
    s_config_dict = get_stripe_config()
    PUB_KEY = False
    try:
        PUB_KEY = s_config_dict["PUB_KEY"]
        # print('PUB KEY is : ', PUB_KEY)
    except KeyError as e:
        print ('EXCEPT get_stripe_pub_key: ',e)
    return PUB_KEY


def get_stripe_pvt_key():
    s_config_dict = get_stripe_config()
    SEC_KEY = False
    try:
        SEC_KEY = s_config_dict["SEC_KEY"]
        # print('SEC_KEY is : ', SEC_KEY)
    except KeyError as e:
        print ('EXCEPT get_stripe_pvt_key: ',e)
    return SEC_KEY

def create_card_token_utils(number, exp_month, exp_year, cvc):
    SEC_KEY = get_stripe_pvt_key()
    stripe.api_key = SEC_KEY
    response  = {"status" : False}
    try:
        token_obj = stripe.Token.create(
            card={"number": number, "exp_month": exp_month, "exp_year": exp_year,"cvc": cvc})
        card_token = token_obj.get('id')
        response['status'] = True
        response['card_token'] = card_token
    except stripe.error.CardError as e:
        print("create_card_token_utils-ERROR: %s" % e)
        response['error'] = repr(e)
    except Exception as e:
        print("create_card_token_utils-ERROR: %s" % e)
        response['error'] = "an error occurred while creating cardtoken please try again"
    return response

def create_customer(cust_email,card_token=None,customer_token = None):
    SEC_KEY = get_stripe_pvt_key()
    stripe.api_key = SEC_KEY
    if card_token: 
        stripe_customer = stripe.Customer.create(email=cust_email)
        customer_ref_id = stripe_customer['id']
        source_obj = stripe.Source.create(type="card",currency="usd",owner={"email": cust_email},token=card_token,)
        stripe_customer = stripe.Customer.modify(customer_ref_id,source=source_obj.get('id'),)
        customer_ref_id = stripe_customer['id']
    else:
        stripe_customer = stripe.Customer.create(email=cust_email)
        customer_ref_id = stripe_customer['id']
    return customer_ref_id

def modifying_customer(email,card_token,customer_token):
    #this function modifies customer and integrated cardtoken into stripe_customer
    source_obj = stripe.Source.create(type="card",
        currency="usd",owner={"email": email},token=card_token,)
    stripe_customer = stripe.Customer.modify(customer_token,source=source_obj.get('id'),)
    return stripe_customer


def process_single_payment(customer_obj,invoice_obj, pay_amt, currency_type, stripe_customer=None, confirm=True):
    customer_email = customer_obj.i_profile.user.email
    clean_vendor_name = customer_email
    SEC_KEY = get_stripe_pvt_key()
    stripe.api_key = SEC_KEY 
    print("process_single_payment")
    if stripe_customer:
        try:
            pay_intent = stripe.PaymentIntent.create(
                customer=customer_obj.ref_id,
                payment_method=stripe_customer['default_source'],
                amount=int((pay_amt)*100),
                currency=currency_type,
                confirm=confirm,
                description=customer_email + ' - ' + invoice_obj.i_plan.name,
                metadata={'bits_invoice_id':customer_obj.id,
                            'bits_description':customer_email + ' - ' + invoice_obj.i_plan.name,}, 
                statement_descriptor=clean_vendor_name.encode('utf-8')[:20], 
                )
            remarks = pay_intent.get('status')
            data = pay_intent.get('id')
        except stripe.error.InvalidRequestError as e:
            remarks = 'unsucceeded'
            data = repr(e)
    else:
        try:
            pay_intent = stripe.PaymentIntent.create(
                customer=customer_obj.ref_id,
                amount=int(pay_amt * 100),
                currency=currency_type,
                confirm=confirm,
                description=customer_email + ' - ' + invoice_obj.i_plan.name,
                metadata={'bits_invoice_id':customer_obj.id,
                            'bits_description':customer_email + ' - ' + invoice_obj.i_plan.name,}, 
                statement_descriptor=clean_vendor_name.encode('utf-8')[:20],
            )
            remarks = pay_intent.get('status')
            data = pay_intent.get('id')
        except stripe.error.InvalidRequestError as e:
            remarks = 'unsucceeded'
            data = repr(e)

    # if remarks == 'succeeded':
    #     return remarks ,data
    # else:
        return remarks,data

def process_payment(invoice_obj, customer_obj, card_token=None, confirm=True):
    currency_type = 'usd'
    payment_int_list = {}
    msg = {'data':'', 'status':'' ,"error" : ""}
    SEC_KEY = get_stripe_pvt_key()
    stripe.api_key = SEC_KEY 
    if card_token:
        source_obj = stripe.Source.create(type="card",
        currency="usd",owner={"email": customer_obj.i_profile.user.email},
        token=card_token,)
        stripe_customer = stripe.Customer.modify(customer_obj.ref_id,
                        source=source_obj.get('id'),)
    if invoice_obj.amount >= 5.0:
        amt_list = []
        Mutliple_payment = GlobalConfiguration.objects.get(name='Mutliple_payment').value
        if Mutliple_payment == "False":
            amt_list.append(invoice_obj.amount)
        else:
            amt_list.append(invoice_obj.amount - 3)
            amt_list.append(2)
            amt_list.append(1)
        print ("Amount List is : ", amt_list)
        
        for iter_num, pay_amt in enumerate(amt_list):
            print ("Initializing for Payment number ", iter_num)
            print ("Initializing for Payment of ", pay_amt)
            if card_token:
                remarks,data = process_single_payment(customer_obj,invoice_obj, pay_amt, currency_type, stripe_customer)
                payment_int_list[pay_amt]=data
            else:
                remarks ,data = process_single_payment(customer_obj,invoice_obj, pay_amt, currency_type)
                payment_int_list[pay_amt]=data

            print ("Payment Remarks are : ", remarks)
            if remarks != 'succeeded':
                print ("Payments did not process properly")
                if iter_num == 0:
                    # Failure of only first payment(which is the largest chunk) will be considered as Failure
                    msg['status'] = 'FAILED'
                    msg['error'] = data
                break
        
    else:
        pay_amt = invoice_obj.amount
        print ("Initializing SINGLE Payment of ", pay_amt)
        if card_token:
            remarks,data = process_single_payment(customer_obj, pay_amt, currency_type, stripe_customer)
            payment_int_list[pay_amt]=data

        else:
            remarks,data = process_single_payment(customer_obj, pay_amt, currency_type)
            payment_int_list[pay_amt]=data

        print ("Payment Remarks are : ", remarks)
        if remarks != 'succeeded':
            print ("Payments did not process properly")
            msg['status'] = 'FAILED'
            msg['error'] = data

    if msg['status'] != 'FAILED':
        # payment_status = True
        # customer_obj.is_paid = payment_status
        # customer_obj.save()
        msg['status'] = True
        msg['data'] = payment_int_list
        print(payment_int_list)
    return msg


def get_user_subscription(user):
    list_of_user_subscription = []
    profile_obj = Profile.objects.get(user=user)
    customer_obj = Customer.objects.get(i_profile = profile_obj)
    subs_obj =  Subscriptions.objects.filter(profile_id = profile_obj,is_active = True).values()
    for subs in subs_obj:
        list_of_user_subscription.append(subs)
    for i in list_of_user_subscription:
        i['profile_id_id'] = customer_obj.i_profile.user.email
        # print(invoice['i_plan_id'])
        plan_obj =  Plan.objects.get(pk = i["plan_id_id"])
        i['plan_id_id'] = plan_obj.name
    return list_of_user_subscription


