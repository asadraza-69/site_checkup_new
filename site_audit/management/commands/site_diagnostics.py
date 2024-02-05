import json
import requests
from django.core.management.base import BaseCommand
from django.db import transaction
from site_audit.utils import save_remarks
from site_audit.models import *


class Command(BaseCommand):
    help = 'site_diagnostics'

    def handle(self, *args, **options):
        site_audit_job_qs = SiteAuditJob.objects.filter(job_status='site_analyzed')
        print('site_audit_job_qs:', site_audit_job_qs)
        for site_audit_job_obj in site_audit_job_qs:
            print("site_audit_job_obj:", site_audit_job_obj)
            try:
                with transaction.atomic():
                    job_id = site_audit_job_obj.pk
                    website_url = site_audit_job_obj.i_site_audit_project.website_url
                    get_site_diagnostics_data_api_url = "%s/" % settings.GET_SITE_DIAGNOSTICS_DATA_API_URL
                    print('get_site_diagnostics_data_api_url:', get_site_diagnostics_data_api_url)
                    data = {'website_base_url': website_url}
                    print('post_data:', data)
                    site_diagnostics_api_response = requests.post(get_site_diagnostics_data_api_url, data=data).json()

                    if site_diagnostics_api_response['status']:
                        site_audit_data_obj, is_created = SiteAuditData.objects.get_or_create(i_site_audit_job_id=job_id)
                        website_seo_data = json.load(site_audit_data_obj.website_seo_data)
                        site_diagnostics_api_response.pop('status')
                        website_seo_data.update(site_diagnostics_api_response)
                        filepath = site_audit_data_obj.website_seo_data.path
                        with open(filepath, 'w') as fp:
                            json.dump(website_seo_data, fp, indent=4)
                        site_audit_data_obj.save()
                        site_audit_job_obj.job_status = 'site_diagnosed'
                        remarks = 'Site Diagnostics Completed Successfully'
                        site_audit_job_obj.remarks = remarks
                        site_audit_job_obj.no_of_attempts = 0
                        site_audit_job_obj.save()
                        self.stdout.write(self.style.SUCCESS(remarks))
                    else:
                        save_remarks(site_audit_job_obj, site_diagnostics_api_response['error'])
                        self.stdout.write(self.style.ERROR('Error: %s' % site_diagnostics_api_response['error']))
            except Exception as e:
                exp = 'Exception: %s' % repr(e)
                self.stdout.write(self.style.ERROR(exp))
                save_remarks(site_audit_job_obj, e)
