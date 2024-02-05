from django.contrib.auth.models import User
from loggings.models import SystemLogs
from django.utils import timezone


def save_system_logs(action_desc, email):
    try:
        user_obj = User.objects.get(email=email)
        SystemLogs(**{'action_by': user_obj.email, 'action_desc': action_desc,
                      'action_by_id': user_obj.pk, 'action_date': timezone.localtime(timezone.now())}).save()
    except Exception as e:
        print('Exception:', e)


