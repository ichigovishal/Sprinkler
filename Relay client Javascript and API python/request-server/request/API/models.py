from django.db import models

# Create your models here.


class SprinklerData(models.Model):
    time = models.DateTimeField(
         verbose_name="Time",
         editable=False,
         blank=False,
         primary_key=True
    )
    sprinkler_port = models.IntegerField(
        verbose_name="Sprinkler Port",
        editable=False,
        blank=False,
        default=0
    )
    status_of_sprinkler = models.BooleanField(
         verbose_name="Status of the Sprinkler",
         default=False,
         editable=False,
         blank=False
    )
    approximation_total_interval = models.IntegerField(
         verbose_name="Total Approximation Interval",
         editable=False,
         blank=False
    )
    last_on = models.IntegerField(
         verbose_name="Last Time On",
         editable=False,
         blank=False
    )
    moisture_reading = models.FloatField(
         verbose_name=" Moisture Reading",
         blank=False,
         editable=False
    )
    was_closed_overtime = models.BooleanField(
         verbose_name="Was Sprinkler closed because of overtime.",
         default=False,
         editable=False
    )
    minimum_moisture_level = models.FloatField(
         verbose_name="Minimum Moisture Level",
         editable=False
    )
    time_after_which_shutdown = models.IntegerField(
         verbose_name="Time after which to Shutdown",
         editable=False
    )
    check_after_hours = models.IntegerField(
         verbose_name="Check after hours",
         editable=False
    )
    on_since = models.IntegerField(
         verbose_name=" On since",
         editable=False
    )
