# Generated by Django 3.2.8 on 2022-07-20 09:57

from django.db import migrations, models
import site_audit.models


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0003_alter_siteauditproject_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='siteauditdata',
            name='analytics_seo_data',
            field=models.FileField(blank=True, max_length=256, null=True, upload_to=site_audit.models.get_analytics_data_file_path),
        ),
        migrations.DeleteModel(
            name='ProjectPeriodWiseDetail',
        ),
    ]
