# Generated by Django 5.0.6 on 2024-08-27 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OrderService', '0006_remove_purchaseorder_total_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseorderiteminwardedlog',
            name='mrp',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='purchaseorderitems',
            name='mrp',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
