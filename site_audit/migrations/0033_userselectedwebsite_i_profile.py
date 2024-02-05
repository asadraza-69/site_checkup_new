# Generated by Django 3.2.8 on 2023-02-21 09:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0005_auto_20220826_0603'),
        ('site_audit', '0032_userselectedwebsite'),
    ]

    operations = [
        migrations.AddField(
            model_name='userselectedwebsite',
            name='i_profile',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user_management.profile'),
        ),
    ]
