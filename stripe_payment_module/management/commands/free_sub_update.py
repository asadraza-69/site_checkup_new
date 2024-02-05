from django.core.management.base import BaseCommand, CommandError
from subscription_module.models import *
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.db import transaction

class Command(BaseCommand):
    help = 'renew free subscriptions'

    def handle(self, *args, **options):
        with transaction.atomic():
            subscriptions_obj =  Subscriptions.objects.filter(plan_id__id = 1,is_active = True,ends_at__lte =  timezone.now())
            for sub_obj in subscriptions_obj:
                sub_obj.ends_at = timezone.now() + relativedelta(months=+1)
                sub_obj.save()
                
                user_consume_units_qs = UserModuleUnits.objects.filter(subscription_id=sub_obj)
                for user_consume_obj in user_consume_units_qs:
                    user_consume_obj.consumed_units = 0
                    user_consume_obj.save()
                
