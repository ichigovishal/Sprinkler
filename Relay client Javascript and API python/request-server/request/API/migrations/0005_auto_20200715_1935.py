# Generated by Django 3.0.8 on 2020-07-15 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_auto_20200703_1216'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sprinklerdata',
            name='time',
            field=models.DateTimeField(editable=False, primary_key=True, serialize=False, verbose_name='Time'),
        ),
    ]