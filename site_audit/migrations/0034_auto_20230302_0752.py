# Generated by Django 3.2.8 on 2023-03-02 07:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0033_userselectedwebsite_i_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='website',
            name='attempt_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='website',
            name='crawling_count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]