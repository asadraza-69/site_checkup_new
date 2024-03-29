# Generated by Django 3.2.8 on 2022-08-16 09:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0017_websiteanchortext'),
    ]

    operations = [
        migrations.CreateModel(
            name='WebsiteOrganicKeywords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keywords', models.JSONField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('i_website', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site_audit.website')),
            ],
            options={
                'db_table': 'website_organic_keywords',
            },
        ),
    ]
