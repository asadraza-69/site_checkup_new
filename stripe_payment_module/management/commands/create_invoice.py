from django.core.management.base import BaseCommand, CommandError
# from some_app.models import Book
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from stripe_payment_module.models import *
from subscription_module.models import *
from django.db import transaction
from datetime import datetime
import pytz



class Command(BaseCommand):

    help = 'create_invoice'
    def handle(self, *args, **options):
        msg = {'status' : 'FAILED', 'error':''}
        cycle_month = 0
        current_date = timezone.now()
        subscriptions_obj_qs = Subscriptions.objects.filter(is_active =True,ends_at__lte = current_date )
        for subscriptions_obj in subscriptions_obj_qs:
            if subscriptions_obj.cancelled_at is not None:
                invoice_obj_previous = Invoice.objects.filter(
                                            i_customer__i_profile = subscriptions_obj.profile_id,
                                            i_plan=subscriptions_obj.plan_id,to_date__lte =current_date,
                                            onetime = False
                                            ).latest('created_on')
                
                plan_obj = Plan.objects.get(price = 0)
                next_date = timezone.now() + relativedelta(months = +1)
                with transaction.atomic():
                    new_invoice_obj  = Invoice.objects.create(i_customer = invoice_obj_previous.i_customer,
                                                                i_plan=plan_obj,
                                                                amount = plan_obj.price,
                                                                email =invoice_obj_previous.i_customer.i_profile.user.email,
                                                                from_date = invoice_obj_previous.to_date,
                                                                to_date = next_date)
                    subscriptions_obj.is_active = False
                    subscriptions_obj.save()
                    new_subs_obj = Subscriptions.objects.create(profile_id = subscriptions_obj.profile_id, billing_cycle = 'monthly', plan_id = plan_obj, starts_at = current_date, ends_at = next_date, is_active = True)
            else:
                print("subscriptions_obj",subscriptions_obj.profile_id)
                if subscriptions_obj.billing_cycle == 'monthly':
                    cycle_month = 1
                elif subscriptions_obj.billing_cycle == 'annually':
                    cycle_month = 12
                print("billing_cycle: ",subscriptions_obj.billing_cycle)
                # next_date = current_date + relativedelta(months=cycle_month)
                # previous_date = current_date - relativedelta(months=cycle_month)
                invoice_obj_previous = Invoice.objects.filter(
                                            i_customer__i_profile = subscriptions_obj.profile_id,
                                            i_plan=subscriptions_obj.plan_id,to_date__lte =current_date
                                            ).latest('created_on')
                if invoice_obj_previous:
                    print("Expired_invoice: ",invoice_obj_previous," with the end date is: ",invoice_obj_previous.to_date)
                    # to_date = datetime.fromordinal(invoice_obj_previous.to_date.toordinal())
                    # utc=pytz.UTC
                    # to_date = utc.localize(to_date) 
                    # if to_date <= current_date:
                    invoice_next_date = invoice_obj_previous.to_date + relativedelta(months=cycle_month)
                    with transaction.atomic():
                        new_invoice_obj  = Invoice.objects.create(i_customer = invoice_obj_previous.i_customer,
                                                                    i_plan=subscriptions_obj.plan_id,
                                                                    amount = invoice_obj_previous.amount,
                                                                    email =invoice_obj_previous.i_customer.i_profile.user.email,
                                                                    from_date = invoice_obj_previous.to_date,
                                                                    to_date = invoice_next_date)
                        new_invoice_obj.invoice_number = new_invoice_obj.get_invoice_number()
                        new_invoice_obj.remarks = "unpaid"
                        new_invoice_obj.save()
                        subscriptions_obj.ends_at = invoice_next_date
                        subscriptions_obj.save()
                        print("new_invoice_obj: ",new_invoice_obj," Has been created Successfully")
                else:
                    continue    
                
                
                # # try:
                # #     invoice_obj = Invoice.objects.get(
                # #             i_customer__i_profile = subscriptions_obj.profile_id,
                # #             from_date = current_date,to_date = next_date)
                # #     continue
                # # except Invoice.DoesNotExist:
                    
                # #     with transaction.atomic():
                # #         new_invoice_obj   = Invoice.objects.create(i_customer = invoice_obj.i_customer,
                # #                                                     i_plan=subscriptions_obj.plan_id,
                # #                                                     amount = subscriptions_obj.plan_id.price,
                # #                                                     email =invoice_obj.i_customer.email,
                # #                                                     from_date = invoice_obj.to_date,
                # #                                                     to_date = next_date)
                # #         new_invoice_obj.invoice_number = invoice_obj.get_invoice_number()
                #         new_invoice_obj.save()
                        #subscriptions update endsat date


            # if invoice_obj:
            # try:
                
            # #     # print(f"USER : {subscriptions_obj.profile_id} INVOICES: {invoice_obj}")
            # #     current_date = timezone.now()
            # #     next_date =current_date + relativedelta(months=+1)
            # #     invoice_obj , created  = Invoice.objects.get_or_create(i_customer = invoice_obj.i_customer,
            # #             i_plan=subscriptions_obj.plan_id ,amount = subscriptions_obj.plan_id.price,
            # #             email =invoice_obj.i_customer.email,from_date = invoice_obj.to_date,to_date = next_date)
            # #     if created:
            # #         invoice_obj.invoice_number = invoice_obj.get_invoice_number()
            # #         invoice_obj.save()
            # #         subscriptions_obj.renewed_at = next_date
            # #         subscriptions_obj.save()
            # # except Invoice.DoesNotExist:
            # #     pass

        # invoice_detail_qs = Invoice.objects.filter(to_date__lte =  date.today() , is_paid = True)
        # if invoice_detail_qs:
        #     self.stdout.write(self.style.SUCCESS('SOME_INVOICES ARE FOUND!'))
        #     for invoice in invoice_detail_qs:
        #         i_profile_obj = invoice.i_customer.i_profile
        #         i_customer_obj = invoice.i_customer
        #         inv_obj_qs = Invoice.objects.filter(i_customer =  i_customer_obj , is_paid = False)
        #         if len(inv_obj_qs) == 0:
        #             self.stdout.write(self.style.WARNING('INVOICES ARE FOUND_TO_BE_PAID!'))
        #             subscriptions_obj = Subscriptions.objects.filter(profile_id=i_profile_obj,is_active = True)
        #             for subscription in subscriptions_obj:
        #                 print(subscription)
        #                 next_date =invoice.to_date + timedelta(days=30)
        #                 invoice_obj  = Invoice.objects.create(i_customer = i_customer_obj,
        #                     i_plan=subscription.plan_id ,amount = subscription.plan_id.price,
        #                     email = i_customer_obj.email,from_date = invoice.to_date,to_date = next_date)
        #                 invoice_obj.invoice_number = invoice_obj.get_invoice_number()
        #                 invoice_obj.save()
        #             self.stdout.write(self.style.SUCCESS('Done!'))
        # else:
        #     self.stdout.write(self.style.ERROR('NO_INVOICES ARE FOUND!'))
