from django.contrib import admin
from .models import *
from rbac_preferences.models import *

admin.site.register(PermissionTags)
admin.site.register(PermissionGroups)
admin.site.register(RbacPreference)
admin.site.register(RbacPreferenceGroup)
