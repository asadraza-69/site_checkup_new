# Generated by Django 3.2.8 on 2022-10-26 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0026_auto_20221014_0739'),
    ]

    operations = [
        migrations.AddField(
            model_name='googleanalyticsaccount',
            name='analytics_state',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
    ]
