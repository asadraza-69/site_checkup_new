import json
import requests
from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction
from site_audit.utils import save_remarks
from site_audit.models import *


class Command(BaseCommand):
    help = 'seo_site_analyzer'

    def handle(self, *args, **options):
        site_audit_job_qs = SiteAuditJob.objects.filter(job_status='queued')
        print('site_audit_job_qs:', site_audit_job_qs)
        for site_audit_job_obj in site_audit_job_qs:
            print("site_audit_job_obj:", site_audit_job_obj)
            try:
                with transaction.atomic():
                    job_id = site_audit_job_obj.pk
                    website_url = site_audit_job_obj.i_site_audit_project.website_url
                    get_seo_site_data_api_url = "%s/" % settings.GET_SEO_SITE_DATA_API_URL
                    print('get_seo_site_data_api_url:', get_seo_site_data_api_url)
                    data = {'website_base_url': website_url}
                    print('post_data:', data)
                    seo_site_api_response = requests.post(get_seo_site_data_api_url, data=data).json()

                    if seo_site_api_response['status']:
                        seo_site_api_response.pop('status')
                        site_audit_data_obj, is_created = SiteAuditData.objects.get_or_create(
                            i_site_audit_job_id=job_id)
                        filename = 'website_seo_data_%s.json' % job_id
                        with open(filename, 'w') as fp:
                            json.dump(seo_site_api_response, fp, indent=4)
                        site_audit_data_obj.website_seo_data = File(open(filename))
                        site_audit_data_obj.save()
                        site_audit_job_obj.job_status = 'site_analyzed'
                        remarks = 'Seo Site Analyzer Completed Successfully'
                        site_audit_job_obj.remarks = remarks
                        site_audit_job_obj.no_of_attempts = 0
                        site_audit_job_obj.save()
                        os.remove(filename)
                        self.stdout.write(self.style.SUCCESS(remarks))
                    else:
                        save_remarks(site_audit_job_obj, seo_site_api_response['error'])
                        self.stdout.write(self.style.ERROR('Error: %s' % seo_site_api_response['error']))
            except Exception as e:
                exp = 'Exception: %s' % repr(e)
                self.stdout.write(self.style.ERROR(exp))
                save_remarks(site_audit_job_obj, e)
