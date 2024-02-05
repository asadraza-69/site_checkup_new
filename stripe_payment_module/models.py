from django.db import models
from user_management.models import Profile
from subscription_module.models import Plan
from datetime import datetime
from django.utils import timezone

class Customer(models.Model):
    ref_id = models.CharField(null=True, blank=True, max_length=64)
    card_token = models.CharField(null=True, blank=True, max_length=64)
    i_profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    def __str__(self):
        return self.ref_id
    def __unicode__(self):
        return '%s' % self.ref_id
    class Meta:
        db_table = u'customer'


class Invoice(models.Model):
    i_customer = models.ForeignKey(Customer, null=True, blank=True,on_delete=models.CASCADE)
    invoice_number = models.CharField(max_length=64, unique=True, null=True, blank=True)
    i_plan = models.ForeignKey(Plan, null=True, blank=True,on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=9, decimal_places=2)
    email = models.EmailField(null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    from_date =  models.DateField(default=timezone.now, editable=True)
    paid_date =  models.DateField(null=True, blank=True, editable=True)
    to_date =  models.DateField(default=timezone.now, editable=True)
    onetime = models.BooleanField(default=False)
    multiple_payment = models.BooleanField(default=False)
    retry_count = models.PositiveIntegerField(default=0)
    is_recurring = models.BooleanField(default=False)
    remarks = models.TextField(default = "ErrorLog: ",null=True, blank=True)
    created_on = models.DateTimeField(default=timezone.now,editable=False)
    
    def get_invoice_number(self):
        i , j = 1 , 1
        invoice_number = None
        status = True
        while status == True:
            qs_count0 = Invoice.objects.filter(i_customer=self.i_customer).count()
            qs_count = Invoice.objects.all().count()
            invoice_number_postfix = str(qs_count + i).zfill(4)
            invoice_number_postfix0 = str(qs_count0).zfill(4)
            pre_fix = "WRE"
            invoice_number = '-'.join([pre_fix,invoice_number_postfix0,invoice_number_postfix])
            check_inv = Invoice.objects.filter(invoice_number=invoice_number)
            if check_inv:
                i = i+1
                j = j+1
            else:
                status = False
        return invoice_number




    # def get_invoice_number(self):
    #     qs_count0 = Invoice.objects.filter(i_customer=self.i_customer).count()
    #     qs_count = Invoice.objects.all().count()
    #     # invoice_number_postfix0 = str(self.i_customer_str_mapping.i_customer_id).zfill(4)
    #     invoice_number_postfix = str(qs_count + 1).zfill(4)
    #     invoice_number_postfix0 = str(qs_count0 + 1).zfill(4)
    #     pre_fix = "WRE"
    #     invoice_number = '-'.join([pre_fix,invoice_number_postfix0,invoice_number_postfix])
    #     check_inv = Invoice.objects.filter(invoice_number=invoice_number)
    #     if check_inv:
    #         invoice_number_postfix = str(qs_count + 2).zfill(4)
    #         invoice_number_postfix0 = str(qs_count0 + 1).zfill(4)
    #         pre_fix = "WRE"
    #         invoice_number = '-'.join([pre_fix,invoice_number_postfix0,invoice_number_postfix])
    #     return invoice_number
    
    def __str__(self):
        return str(self.invoice_number)
    def __unicode__(self):
        return '%s' % self.invoice_number
    class Meta:
        db_table = u'invoice'



class Payment(models.Model):    
    # i_customer = models.ForeignKey(Customer, null=True, blank=True ,on_delete=models.CASCADE)
    i_plan =  models.ForeignKey(Plan, null=True, blank= True , on_delete=models.CASCADE)
    i_invoice = models.ForeignKey(Invoice, null=True, blank=True,on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=9, decimal_places=2)
    pay_token = models.CharField(null=True, blank=True, max_length=64)
    

    
    def __unicode__(self):
        return '%s' % self.pay_token
    
    class Meta:
        db_table = u'payment'
    
class ExtraServices(models.Model):
    name = models.CharField(max_length=150)
    price = models.PositiveIntegerField()
    def __str__(self):
        return '%s' % self.name

    class Meta:
        db_table = 'extra_services'

class ExtraServicesMapping(models.Model):
    i_extraservices = models.ForeignKey(ExtraServices , on_delete= models.CASCADE)
    i_invoice = models.ForeignKey(Invoice, on_delete= models.CASCADE)
    is_paid = models.BooleanField(default=False)
    def __str__(self):
        return '%s' % self.i_extraservices

    class Meta:
        db_table = 'extra_services_mapping'
