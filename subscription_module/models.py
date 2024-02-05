import profile
from random import choices
from django.db import models
from ckeditor.fields import RichTextField
from user_management.models import Profile
from django.utils import timezone

# Create your models here.


# class Users(models.Model):
#     name = models.CharField(max_length=64)
#     phone_number = PhoneNumberField(null=True, blank=True)
#     email = models.EmailField()
#     address = models.TextField(max_length = 500)
#     country = models.TextField(max_length = 20)
#     created_at = models.DateTimeField()
#     deleted_at = models.DateTimeField()

#     def __str__(self):
#         return '%s' % self.name

#     class Meta:
#         db_table = 'user'


class Plan(models.Model):
    name = models.CharField(max_length = 64)
    price = models.IntegerField()
    annual_price = models.IntegerField(null= True, blank=True)
    days_per_interval = models.IntegerField()
    description = RichTextField(default = '')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        db_table = 'plan'


class Module(models.Model):
    name = models.CharField(max_length = 64)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        db_table = 'module'


class PlanModuleDetail(models.Model):
    plan_id = models.ForeignKey(Plan, on_delete = models.CASCADE)
    module_id = models.ForeignKey(Module, on_delete = models.CASCADE)
    units_allowed = models.IntegerField()
    remarks = models.TextField(max_length = 500)

    def __str__(self):
        return '%s' % self.remarks

    class Meta:
        db_table = 'plan_module_detail'



class Subscriptions(models.Model):

    MONTHLY = 'monthly'
    ANNUALLY = 'annually'

    CHOICES =[
        (MONTHLY, 'monthly'),
        (ANNUALLY, 'annually'),
    ]

    plan_id = models.ForeignKey(Plan, on_delete = models.CASCADE)
    profile_id = models.ForeignKey(Profile, on_delete = models.CASCADE)

    billing_cycle = models.CharField(
        max_length = 50,
        choices = CHOICES,
        default = MONTHLY,
    )

    # billing_cycle = models.CharField(max_length = 50)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    renewed_at = models.DateTimeField(blank=True, null=True)
    # renewed_subscription_id = models.ForeignKey(Subscriptions, on_delete = models.CASCADE)
    cancelled_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    expired_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default = False)

    def __str__(self):
        return f'{self.profile_id}|{self.plan_id}|{self.billing_cycle}' 
        # return '%s' % self.plan_id

    class Meta:
        db_table = 'subscriptions'



class UserModuleUnits(models.Model):
    # profile_id = models.ForeignKey(Profile, on_delete = models.CASCADE)
    #profile  FK
    subscription_id = models.ForeignKey(Subscriptions, on_delete = models.CASCADE)
    #subscriptions FK
    module_id = models.ForeignKey(Module, on_delete = models.CASCADE)
    # module FK
    consumed_units =  models.IntegerField(default=0)

    def __str__(self):
        return '%s' % self.consumed_units

    class Meta:
        db_table = 'user_module_units'
