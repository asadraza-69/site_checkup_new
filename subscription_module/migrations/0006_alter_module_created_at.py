# Generated by Django 3.2.8 on 2023-01-10 05:57

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('subscription_module', '0005_remove_usermoduleunits_profile_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
