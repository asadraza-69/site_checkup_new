# Generated by Django 3.2.8 on 2022-07-18 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('permissions', '0001_initial'),
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='permission_groups',
            field=models.ManyToManyField(blank=True, to='permissions.PermissionGroups'),
        ),
        migrations.AddField(
            model_name='profile',
            name='permission_tags',
            field=models.ManyToManyField(blank=True, to='permissions.PermissionTags'),
        ),
    ]
