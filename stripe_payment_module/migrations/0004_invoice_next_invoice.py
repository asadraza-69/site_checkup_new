# Generated by Django 3.2.8 on 2022-12-22 12:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stripe_payment_module', '0003_alter_payment_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='next_invoice',
            field=models.DateTimeField(default=datetime.datetime.now, editable=False),
        ),
    ]
