import os
from urllib.parse import urlparse

from django.conf import settings
from django.db import models
from site_audit.models import Website, SiteAuditProject


def get_raw_data_file_path(instance, filename):
    website_url = instance.i_website.website_url
    website_url = urlparse(website_url).netloc
    path = f'site_checkup/website_crawl_data_files/{website_url}/raw_data_files'
    file_dir = os.path.join(settings.MEDIA_ROOT, path)
    if not os.path.isdir(file_dir):
        os.makedirs(file_dir, 0o777)
    return os.path.join(path, filename)


def get_process_data_file_path(instance, filename):
    website_url = instance.project.i_website.website_url
    website_url = urlparse(website_url).netloc
    # webpage_url = instance.i_website.website_url
    # webpage_url = urlparse(webpage_url).netloc
    path = f'site_checkup/website_crawl_data_files/{website_url}/process_data_files'
    file_dir = os.path.join(settings.MEDIA_ROOT, path)
    if not os.path.isdir(file_dir):
        os.makedirs(file_dir, 0o777)
    return os.path.join(path, filename)


class SiteScrapyData(models.Model):
    STATUS_CHOICES = (('queued', 'queued'), ('rejected', 'rejected'), 
                        ('crawled', 'crawled'),('processed', 'processed'))
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE, null=True, blank=True)
    raw_data = models.FileField(max_length=256, upload_to=get_raw_data_file_path, null=True, blank=True)
    process_data = models.FileField(max_length=256, upload_to=get_process_data_file_path, null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='queued')
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pk}"

    class Meta:
        db_table = 'site_scrapy_data'


class SiteProcessData(models.Model):
    # i_website = models.ForeignKey(Website, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE, null=True, blank=True)
    process_data = models.FileField(max_length=256, upload_to=get_process_data_file_path, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project}"
    
    class Meta:
        db_table = 'site_process_data'


class WebsitePages(models.Model):
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE, null=True, blank=True)
    webpage = models.URLField()
    label = models.CharField(max_length=256, null=True, blank=True)
    is_crawled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.webpage}"
    
    class Meta:
        db_table = 'website_pages'
