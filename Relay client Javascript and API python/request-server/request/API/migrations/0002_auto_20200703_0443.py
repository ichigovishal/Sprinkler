# Generated by Django 3.0.8 on 2020-07-03 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sprinklerdata',
            name='minimum_moisture_level',
            field=models.FloatField(editable=False, verbose_name='Minimum Moisture Level'),
        ),
    ]
