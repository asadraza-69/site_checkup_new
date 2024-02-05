# Generated by Django 3.2.8 on 2023-02-20 11:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0031_auto_20221117_0655'),
        ('crawler', '0003_auto_20221014_0917'),
    ]

    operations = [
        migrations.CreateModel(
            name='WebsitePages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('webpage', models.URLField()),
                ('is_crawled', models.BooleanField(default=False)),
                ('i_website', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='site_audit.website')),
            ],
            options={
                'db_table': 'website_pages',
            },
        ),
    ]
