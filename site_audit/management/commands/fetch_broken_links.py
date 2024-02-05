import json
import requests
from django.core.management.base import BaseCommand
from django.db import transaction
from site_audit.utils import save_remarks
from site_audit.models import *
from django.utils import timezone


class Command(BaseCommand):
    help = 'fetch_broken_links'

    def handle(self, *args, **options):
        site_audit_job_qs = SiteAuditJob.objects.filter(job_status='site_diagnosed')
        print('site_audit_job_qs:', site_audit_job_qs)
        for site_audit_job_obj in site_audit_job_qs:
            print("site_audit_job_obj:", site_audit_job_obj)
            try:
                with transaction.atomic():
                    job_id = site_audit_job_obj.pk
                    website_url = site_audit_job_obj.i_site_audit_project.website_url
                    get_broken_link_api_url = "%s/" % settings.GET_BROKEN_LINK_API_URL
                    print('get_broken_link_api_url:', get_broken_link_api_url)
                    data = {'website_base_url': website_url}
                    print('post_data:', data)
                    broken_links_api_response = requests.post(get_broken_link_api_url, data=data).json()

                    if ('status', False) in broken_links_api_response.items():
                        error = 'Error: %s' % broken_links_api_response['error']
                        self.stdout.write(self.style.ERROR(error))
                        save_remarks(site_audit_job_obj, broken_links_api_response['error'])
                    else:
                        site_audit_data_obj, is_created = SiteAuditData.objects.get_or_create(i_site_audit_job_id=job_id)
                        website_seo_data = json.load(site_audit_data_obj.website_seo_data)
                        website_seo_data.update({'page_data_dict': broken_links_api_response})
                        filepath = site_audit_data_obj.website_seo_data.path
                        with open(filepath, 'w') as fp:
                            json.dump(website_seo_data, fp, indent=4)

                        site_audit_data_obj.processed_on = timezone.now()
                        site_audit_data_obj.save()
                        site_audit_job_obj.job_status = 'processed'
                        remarks = 'Site Audit Job Completed Successfully'
                        site_audit_job_obj.remarks = remarks
                        site_audit_job_obj.no_of_attempts = 0
                        site_audit_job_obj.save()
                        self.stdout.write(self.style.SUCCESS(remarks))
            except Exception as e:
                exp = 'Exception: %s' % repr(e)
                self.stdout.write(self.style.ERROR(exp))
                save_remarks(site_audit_job_obj, e)
