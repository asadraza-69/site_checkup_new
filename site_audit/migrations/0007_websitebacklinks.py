# Generated by Django 3.2.11 on 2022-07-29 10:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0006_siteauditproject_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='WebsiteBacklinks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('backlinks_data', models.JSONField(blank=True, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('i_site_audit_project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site_audit.siteauditproject')),
            ],
            options={
                'db_table': 'website_backlinks',
            },
        ),
    ]