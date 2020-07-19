# Generated by Django 3.0.8 on 2020-07-02 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Actions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.IntegerField(max_length=3, verbose_name='Type of action')),
                ('sprinkler_port', models.IntegerField(blank=True, max_length=2, verbose_name='Sprinkler Port')),
                ('approximation_total_interval', models.IntegerField(blank=True, max_length=5, verbose_name='Total Approximation Interval')),
                ('minimum_moisture_level', models.FloatField(blank=True, verbose_name='Minimum Moisture Level')),
                ('check_after_hours', models.IntegerField(blank=True, max_length=2, verbose_name='Check After Hours')),
                ('time_after_which_shutdown', models.IntegerField(blank=True, max_length=3, verbose_name='Time After Which Shutdown')),
                ('state', models.BooleanField(blank=True, verbose_name='State')),
                ('is_done', models.BooleanField(default=False)),
            ],
        ),
    ]