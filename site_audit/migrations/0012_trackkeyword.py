# Generated by Django 3.2.8 on 2022-08-03 10:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0011_alter_projectobjective_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrackKeyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=64)),
                ('tracking_start_time', models.DateTimeField(blank=True, null=True)),
                ('tracking_end_time', models.DateTimeField(blank=True, null=True)),
                ('tracking_status', models.CharField(blank=True, choices=[('start', 'start'), ('stop', 'stop')], max_length=10, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('i_site_audit_project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site_audit.siteauditproject')),
            ],
            options={
                'db_table': 'track_keyword',
            },
        ),
    ]
