from django.core.management.base import BaseCommand, CommandError
# from some_app.models import Book
from datetime import datetime ,date ,timedelta
from django.utils import timezone
from stripe_payment_module.models import *
from stripe_payment_module.utils import *
from subscription_module.models import *
from django.db import transaction
from django.utils import timezone

class Command(BaseCommand):

    help = 'Invoice_payment'
    def handle(self, *args, **options):
        msg = {'status' : 'FAILED', 'error':''}
        invoice_detail_qs = Invoice.objects.filter(is_paid = False,retry_count__lt = 3)
        for invoice in invoice_detail_qs:
            plan_obj = invoice.i_plan
            customer_obj = invoice.i_customer
            profile_obj = customer_obj.i_profile
            if invoice.amount > 0 :
                msg = process_payment(invoice,customer_obj)
                print("payment_resp",msg, "Customer_obj",customer_obj)
                if msg['status']!= 'FAILED':
                    payment_int_list =  msg['data']
                    for amount, pay_int_token in payment_int_list.items():
                        with transaction.atomic():
                            amount = int(amount)
                            payment_obj = Payment.objects.create(i_plan = plan_obj,i_invoice = invoice ,amount = amount , pay_token = pay_int_token)
                            invoice.paid_date = timezone.now()
                            invoice.is_paid = True
                            invoice.remarks = "paid"
                            invoice.save()
                            Mutliple_payment = GlobalConfiguration.objects.get(name='Mutliple_payment').value
                            if Mutliple_payment != "False":
                                invoice.multiple_payment = True
                                invoice.save()
                    subscriptions_obj =  Subscriptions.objects.get(plan_id = plan_obj,
                                        profile_id=profile_obj,is_active =True)
                    subscriptions_obj.ends_at = invoice.to_date
                    subscriptions_obj.save()
                else:
                    with transaction.atomic:
                        error_msg =  msg['error']
                        response = {'status': False,'error': error_msg}
                        print (response)
                        invoice.retry_count +=1
                        invoice.remarks += f"{error_msg}\n,"
                        invoice.save()
            else:
                with transaction.atomic:
                    invoice.paid_date = timezone.now()
                    invoice.is_paid = True
                    invoice.remarks = "paid"
                    invoice.save()
                    subscriptions_obj =  Subscriptions.objects.get(plan_id = plan_obj,
                                            profile_id=profile_obj,is_active =True)
                    subscriptions_obj.ends_at = invoice.to_date
                    subscriptions_obj.save()