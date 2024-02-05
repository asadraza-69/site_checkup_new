from django.contrib import admin
from .models import *


@admin.register(SiteAuditProject)
class SiteAuditProjectAdmin(admin.ModelAdmin):
    list_display = ('i_website', 'created_on', 'created_by')
    search_fields = ('pk','i_website__website_url', 'created_by__username' , 'created_on')


@admin.register(SiteAuditJob)
class SiteAuditProjectAdmin(admin.ModelAdmin):
    list_display = ('i_site_audit_project', 'job_status', 'no_of_attempts', 'created_on')
    list_filter = ('job_status',)


@admin.register(SiteAuditData)
class SiteAuditProjectAdmin(admin.ModelAdmin):
    list_display = ('i_site_audit_job', 'processed_on')


@admin.register(SiteCompetitor)
class SiteCompetitorAdmin(admin.ModelAdmin):
    list_display = ('i_site_audit_project', 'i_website', 'created_on')


@admin.register(WebsiteBacklink)
class WebsiteBacklinkAdmin(admin.ModelAdmin):
    list_display = ('i_website', 'created_on')


@admin.register(WebsiteSeoData)
class WebsiteSeoDataAdmin(admin.ModelAdmin):
    list_display = ('i_website', 'created_on')


@admin.register(Website)
class WebsiteAdmin(admin.ModelAdmin):
    list_display = ('website_url', 'crawl_request_inprocess','error_occured','crawling_count', 'created_on','attempt_date')
    search_fields = ('website_url', 'created_on')


admin.site.register(ObjectiveType)
admin.site.register(ProjectObjective)
admin.site.register(TrackKeyword)
admin.site.register(TrackKeywordDetail)
admin.site.register(GoogleAnalytics)
admin.site.register(CompetitorTrackKeyword)
admin.site.register(CompetitorTrackKeywordDetail)
admin.site.register(ContactUs)
admin.site.register(GoogleAnalyticsAccount)


@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ('i_objective_type', 'objective_name', 'level', 'duration', 'created_on')


@admin.register(WebsiteAnchorText)
class WebsiteAnchorTextAdmin(admin.ModelAdmin):
    list_display = ('i_website', 'created_on')


@admin.register(WebsiteOrganicKeywords)
class WebsiteOrganicKeywordsAdmin(admin.ModelAdmin):
    list_display = ('i_website', 'created_on')


@admin.register(UserSelectedWebsite)
class UserSelectedAdmin(admin.ModelAdmin):
    list_display = ('i_profile','i_site_audit_project', 'i_website')
    # search_fields = ('i_profile__user','i_site_audit_project', 'i_website__website_url')