# Generated by Django 3.2.8 on 2022-10-12 06:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0024_googleanalyticsaccount_created_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='googleanalyticsaccount',
            name='created_by',
        ),
        migrations.AddField(
            model_name='googleanalyticsaccount',
            name='i_site_audit_project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='site_audit.siteauditproject'),
        ),
    ]
