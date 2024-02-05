from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from loggings.models import SystemLogs
from loggings.utils import save_system_logs


@login_required
def system_logs_list(request):
    return render(request, 'loggings/system_logs_list.html')


@login_required
def system_logs_listview(request):
    response = {'status': False}
    try:
        response = {'headers': ['User Email', 'User ID', 'Activity on', 'Description']}
        rows = []
        columns = ['action_by', 'action_by_id', 'action_date', 'action_desc']
        system_logs_vs = SystemLogs.objects.values_list(*columns).order_by('-pk')
        for action_by, action_by_id, action_date, action_desc in system_logs_vs:
            row = [[action_by, ''], [action_by_id, ''],
                   [action_date.strftime('%B %d, %Y - %H:%M:%S') if action_date else '-', ''], [action_desc, '']]
            rows.append(row)
        response['data'] = rows
        response['status'] = True
        response['page_title'] = "System Logs"
        log_msg = "%s Visited the System Logs Page" % request.user.first_name
        save_system_logs(log_msg, request.user.email)
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)
