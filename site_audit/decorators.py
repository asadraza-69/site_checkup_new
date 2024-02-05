from django.http import HttpResponseRedirect

from site_audit.models import SiteAuditProject


def project_required():

    def _method_wrapper(function):
        def wrap(request, *args, **kwargs):
            user_projects = SiteAuditProject.objects.filter(created_by=request.user)
            if user_projects:
                return function(request, *args, **kwargs)
            else:
                return HttpResponseRedirect('/site_audit/add_website/')
        return wrap
    return _method_wrapper
