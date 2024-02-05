from django.contrib.auth.models import User
from django.db import models
from permissions.models import PermissionTags, PermissionGroups
from phonenumber_field.modelfields import PhoneNumberField


class Profile(models.Model):
    PROFILE_ROLE_CHOICES = (('user', 'user'),)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    role = models.CharField(max_length=32, choices=PROFILE_ROLE_CHOICES, null=True, blank=True)
    phone_number = PhoneNumberField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    permission_tags = models.ManyToManyField(PermissionTags, blank=True)
    permission_groups = models.ManyToManyField(PermissionGroups, blank=True)

    def __str__(self):
        return '%s' % self.user

    class Meta:
        db_table = 'profile'


class GlobalConfiguration(models.Model):
    name = models.CharField(max_length=64)
    value = models.CharField(max_length=64)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        db_table = 'global_configuration'


class ProfileOTP(models.Model):
    i_profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    expiry_time = models.DateTimeField()

    def __str__(self):
        return '%s' % self.user

    class Meta:
        db_table = 'profile_otp'
