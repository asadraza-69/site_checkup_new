# Generated by Django 3.2.8 on 2023-01-03 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stripe_payment_module', '0010_auto_20230102_1259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='remarks',
            field=models.TextField(blank=True, default='ErrorLog: ', null=True),
        ),
    ]