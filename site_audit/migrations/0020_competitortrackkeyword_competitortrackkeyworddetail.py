# Generated by Django 3.2.8 on 2022-08-17 10:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('site_audit', '0019_alter_trackkeyworddetail_tracking_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='CompetitorTrackKeyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=64)),
                ('tracking_status', models.CharField(blank=True, choices=[('start', 'start'), ('stop', 'stop')], max_length=10, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('i_site_competitor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site_audit.sitecompetitor')),
            ],
            options={
                'db_table': 'competitor_track_keyword',
                'unique_together': {('i_site_competitor', 'keyword')},
            },
        ),
        migrations.CreateModel(
            name='CompetitorTrackKeywordDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tracking_date', models.DateField()),
                ('tracking_value', models.IntegerField()),
                ('tracking_change', models.IntegerField(blank=True, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('i_competitor_track_keyword', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='site_audit.competitortrackkeyword')),
            ],
            options={
                'db_table': 'competitor_track_keyword_detail',
            },
        ),
    ]
