# Generated by Django 3.2.8 on 2022-10-27 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0029_merge_20221027_1244'),
    ]

    operations = [
        migrations.AddField(
            model_name='googleanalyticsaccount',
            name='account_data_all',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
