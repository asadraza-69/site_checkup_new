# Generated by Django 3.2.8 on 2022-07-19 08:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import site_audit.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteAuditProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website_url', models.URLField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('update_interval_hours', models.IntegerField(default=24)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'site_audit_project',
                'unique_together': {('website_url', 'created_by')},
            },
        ),
        migrations.CreateModel(
            name='SiteAuditJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('job_status', models.CharField(choices=[('queued', 'queued'), ('site_analyzed', 'site_analyzed'), ('site_diagnosed', 'site_diagnosed'), ('rejected', 'rejected'), ('processed', 'processed')], default='queued', max_length=32)),
                ('remarks', models.TextField(blank=True, null=True)),
                ('no_of_attempts', models.IntegerField(default=0)),
                ('i_site_checkup_project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site_audit.siteauditproject')),
            ],
            options={
                'db_table': 'site_audit_job',
            },
        ),
        migrations.CreateModel(
            name='SiteAuditData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website_seo_data', models.FileField(max_length=256, upload_to=site_audit.models.get_seo_data_file)),
                ('processed_on', models.DateTimeField(blank=True, null=True)),
                ('i_site_audit_job', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='site_audit.siteauditjob')),
            ],
            options={
                'db_table': 'site_audit_data',
            },
        ),
        migrations.CreateModel(
            name='ProjectPeriodWiseDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('health_score', models.CharField(blank=True, max_length=64, null=True)),
                ('visits', models.CharField(blank=True, max_length=64, null=True)),
                ('period', models.CharField(blank=True, max_length=64, null=True)),
                ('change', models.CharField(blank=True, max_length=64, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('i_site_checkup_project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site_audit.siteauditproject')),
            ],
            options={
                'db_table': 'project_period_wise_detail',
            },
        ),
    ]
