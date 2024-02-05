# Generated by Django 3.2.8 on 2022-08-26 06:03

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0004_profile_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profile',
            name='phone_number',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None),
        ),
        migrations.CreateModel(
            name='ProfileOTP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('otp', models.CharField(max_length=6)),
                ('expiry_time', models.DateTimeField()),
                ('i_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_management.profile')),
            ],
            options={
                'db_table': 'profile_otp',
            },
        ),
    ]