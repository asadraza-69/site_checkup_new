import os
from urllib.parse import urlparse
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from user_management.models import Profile


def get_seo_data_file(instance, filename):
    website_url = instance.i_website.website_url
    website_url = urlparse(website_url).netloc
    path = f'site_checkup/website_seo_data_files/{website_url}'
    file_dir = os.path.join(settings.MEDIA_ROOT, path)
    if not os.path.isdir(file_dir):
        os.makedirs(file_dir, 0o777)
    return os.path.join(path, filename)


def get_backlinks_data_file(instance, filename):
    website_url = instance.i_website.website_url
    website_url = urlparse(website_url).netloc
    path = f'site_checkup/website_backlinks_data_files/{website_url}'
    file_dir = os.path.join(settings.MEDIA_ROOT, path)
    if not os.path.isdir(file_dir):
        os.makedirs(file_dir, 0o777)
    return os.path.join(path, filename)


def get_analytics_data_file_path(instance, filename):
    project_obj = instance.i_site_audit_job.i_site_audit_project
    website_url = urlparse(project_obj.website_url)
    path = 'site_checkup/seo_data_files/%s_%s/analytics_seo_data_files' % (website_url.hostname, project_obj.pk)
    file_dir = os.path.join(settings.MEDIA_ROOT, path)
    if not os.path.isdir(file_dir):
        os.makedirs(file_dir, 0o777)
    return os.path.join(path, filename)


def get_anchor_text_file_path(instance, filename):
    website_url = instance.i_website.website_url
    website_url = urlparse(website_url).netloc
    path = f'site_checkup/website_anchor_text_data_files/{website_url}'
    file_dir = os.path.join(settings.MEDIA_ROOT, path)
    if not os.path.isdir(file_dir):
        os.makedirs(file_dir, 0o777)
    return os.path.join(path, filename)


class Website(models.Model):
    website_url = models.URLField(unique=True)
    crawl_request_inprocess = models.BooleanField(default=False)
    error_occured = models.BooleanField(default=False)
    error_description = models.TextField(blank=True,null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    crawling_count =  models.PositiveIntegerField(default= 0)
    attempt_date =  models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return '%s' % self.website_url

    class Meta:
        db_table = 'website'
        unique_together = ('website_url', 'crawl_request_inprocess')


class SiteAuditProject(models.Model):
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE, null=True, blank=True)
    # website_url = models.URLField()
    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    update_interval_hours = models.IntegerField(default=24)
    location = models.CharField(max_length=128, null=True, blank=True)

    def __str__(self):
        return '%s-%s' % (self.i_website,self.created_by)

    class Meta:
        db_table = 'site_audit_project'
        unique_together = ('i_website', 'created_by')


class SiteAuditJob(models.Model):
    JOB_STATUS_CHOICES = (
        ('queued', 'queued'), ('site_analyzed', 'site_analyzed'), ('site_diagnosed', 'site_diagnosed'),
        ('rejected', 'rejected'), ('processed', 'processed'))
    i_site_audit_project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    job_status = models.CharField(max_length=32, choices=JOB_STATUS_CHOICES, default='queued')
    remarks = models.TextField(null=True, blank=True)
    no_of_attempts = models.IntegerField(default=0)

    def __str__(self):
        return '%s' % self.i_site_audit_project

    class Meta:
        db_table = 'site_audit_job'


class SiteAuditData(models.Model):
    i_site_audit_job = models.OneToOneField(SiteAuditJob, on_delete=models.CASCADE)
    website_seo_data = models.FileField(max_length=256, upload_to=get_seo_data_file)
    analytics_seo_data = models.FileField(max_length=256, upload_to=get_analytics_data_file_path, null=True,
                                          blank=True)
    processed_on = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return '%s' % self.i_site_audit_job

    class Meta:
        db_table = 'site_audit_data'


class SiteCompetitor(models.Model):
    i_site_audit_project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE)
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE, null=True, blank=True)
    # website_url = models.URLField()
    website_data = models.JSONField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s-%s' % (self.i_site_audit_project, self.i_website)

    class Meta:
        db_table = 'site_competitor'
        unique_together = ('i_site_audit_project', 'i_website')


class WebsiteBacklink(models.Model):
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE)
    backlinks_data = models.FileField(max_length=256, upload_to=get_backlinks_data_file)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % self.i_website

    class Meta:
        db_table = 'website_backlink'


class WebsiteSeoData(models.Model):
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE)
    website_seo_data = models.FileField(max_length=256, upload_to=get_seo_data_file)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % self.i_website

    class Meta:
        db_table = 'website_seo_data'


class WebsiteAnchorText(models.Model):
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE)
    anchor_text_data = models.FileField(max_length=256, upload_to=get_anchor_text_file_path)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % self.i_website

    class Meta:
        db_table = 'website_anchor_text'


class ObjectiveType(models.Model):
    name = models.CharField(unique=True, max_length=64)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        db_table = 'objective_type'


class Objective(models.Model):
    i_objective_type = models.ForeignKey(ObjectiveType, on_delete=models.CASCADE)
    objective_name = models.CharField(max_length=64)
    objective_desc = models.TextField(default='')
    objective_sub_desc = models.TextField(default='')
    level = models.CharField(max_length=64)
    duration = models.CharField(max_length=64)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s-%s' % (self.i_objective_type, self.objective_name)

    class Meta:
        db_table = 'objective'


class ProjectObjective(models.Model):
    OBJECTIVE_STATUS_CHOICES = (
        ('begin', 'begin'), ('resume', 'resume'), ('skip', 'skip'))
    i_site_audit_project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE)
    i_objective = models.ForeignKey(Objective, on_delete=models.CASCADE)
    objective_status = models.CharField(max_length=64, choices=OBJECTIVE_STATUS_CHOICES, default='begin')
    completion_score = models.DecimalField(max_digits=6, decimal_places=2)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s-%s' % (self.i_site_audit_project, self.i_objective)

    class Meta:
        db_table = 'project_objective'
        unique_together = ('i_site_audit_project', 'i_objective')


class TrackKeyword(models.Model):
    TRACKING_STATUS_CHOICES = (
        ('start', 'start'), ('stop', 'stop'))
    i_site_audit_project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE)
    keyword = models.CharField(max_length=64)
    tracking_status = models.CharField(max_length=10, choices=TRACKING_STATUS_CHOICES, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s-%s' % (self.i_site_audit_project, self.keyword)

    class Meta:
        db_table = 'track_keyword'
        unique_together = ('i_site_audit_project', 'keyword')


class TrackKeywordDetail(models.Model):
    i_track_keyword = models.ForeignKey(TrackKeyword, on_delete=models.CASCADE)
    tracking_date = models.DateField()
    tracking_value = models.IntegerField()
    tracking_change = models.IntegerField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s-%s' % (self.i_track_keyword, self.tracking_value)

    class Meta:
        db_table = 'track_keyword_detail'


class GoogleAnalytics(models.Model):
    i_site_audit_project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE)
    analytics_data = models.JSONField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % self.i_site_audit_project

    class Meta:
        db_table = 'google_analytics'


class WebsiteOrganicKeywords(models.Model):
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE)
    keywords = models.JSONField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % self.i_website

    class Meta:
        db_table = 'website_organic_keywords'


class CompetitorTrackKeyword(models.Model):
    TRACKING_STATUS_CHOICES = (
        ('start', 'start'), ('stop', 'stop'))
    i_site_competitor = models.ForeignKey(SiteCompetitor, on_delete=models.CASCADE)
    keyword = models.CharField(max_length=64)
    tracking_status = models.CharField(max_length=10, choices=TRACKING_STATUS_CHOICES, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s-%s' % (self.i_site_competitor, self.keyword)

    class Meta:
        db_table = 'competitor_track_keyword'
        unique_together = ('i_site_competitor', 'keyword')


class CompetitorTrackKeywordDetail(models.Model):
    i_competitor_track_keyword = models.ForeignKey(CompetitorTrackKeyword, on_delete=models.CASCADE)
    tracking_date = models.DateField()
    tracking_value = models.IntegerField()
    tracking_change = models.IntegerField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s-%s' % (self.i_competitor_track_keyword, self.tracking_value)

    class Meta:
        db_table = 'competitor_track_keyword_detail'


class ContactUs(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField(null=True, blank=True)
    phone_number = PhoneNumberField(null=True, blank=True)
    subject = models.CharField(max_length=128, null=True, blank=True)
    address = models.CharField(max_length=128, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        db_table = 'contact_us'


class GoogleAnalyticsAccount(models.Model):
    i_site_audit_project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE, null=True, blank=True)
    account_data = models.JSONField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    analytics_state = models.CharField(max_length=512, null=True, blank=True)
    account_data_all = models.JSONField(null=True, blank=True)

    def __str__(self):
        return '%s' % self.pk

    class Meta:
        db_table = 'google_analytics_account'


class UserSelectedWebsite(models.Model):
    i_profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    i_site_audit_project = models.ForeignKey(SiteAuditProject, on_delete=models.CASCADE, null=True, blank=True)
    i_website = models.ForeignKey(Website, on_delete=models.CASCADE, null=True, blank=True)


    def __str__(self):
        return '%s' % self.pk
    
    class Meta:
        db_table = 'user_selected_website'