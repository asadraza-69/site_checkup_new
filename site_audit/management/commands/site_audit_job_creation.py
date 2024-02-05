from django.core.management.base import BaseCommand
from site_audit.models import *
from datetime import timedelta
from django.utils import timezone


class Command(BaseCommand):
    help = 'site_audit_job_creation'

    def handle(self, *args, **options):
        try:
            site_audit_project_qs = SiteAuditProject.objects.all()
            for project_obj in site_audit_project_qs:
                site_job_qs = SiteAuditJob.objects.filter(
                    i_site_audit_project=project_obj).order_by('-created_on')
                if site_job_qs:
                    site_job_obj = site_job_qs[0]
                    try:
                        site_audit_obj = SiteAuditData.objects.get(i_site_audit_job=site_job_obj)
                    except:
                        continue
                    update_interval_hours = project_obj.update_interval_hours
                    interval_time = timezone.now() - timedelta(hours=update_interval_hours)
                    if site_audit_obj.processed_on and interval_time >= site_job_obj.created_on:
                        SiteAuditJob.objects.create(i_site_audit_project=project_obj)
                        self.stdout.write(self.style.SUCCESS("New Job Created for %s" % project_obj))
            print('Command Run Successfully')
        except Exception as e:
            exp = 'Exception: %s' % repr(e)
            self.stdout.write(self.style.ERROR(exp))
