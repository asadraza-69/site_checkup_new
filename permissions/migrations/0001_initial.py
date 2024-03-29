# Generated by Django 3.2.8 on 2022-07-18 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PermissionTags',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('codename', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'verbose_name': 'Permission Tag',
                'verbose_name_plural': 'Permission Tags',
                'db_table': 'permissions_tags',
            },
        ),
        migrations.CreateModel(
            name='PermissionGroups',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('permissions', models.ManyToManyField(blank=True, to='permissions.PermissionTags')),
            ],
            options={
                'verbose_name': 'Permission Group',
                'verbose_name_plural': 'Permission Groups',
                'db_table': 'permissions_groups',
            },
        ),
    ]
