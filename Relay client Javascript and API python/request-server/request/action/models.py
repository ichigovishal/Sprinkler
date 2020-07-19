from django.db import models

# Create your models here.


class Actions(models.Model):
    type = models.IntegerField(
        max_length=3,
        blank=False,
        verbose_name="Type of action",
        null=True
    )
    sprinkler_port = models.IntegerField(
        max_length=2,
        blank=True,
        verbose_name="Sprinkler Port",
        null = True
    )
    approximation_total_interval = models.IntegerField(
        max_length=5,
        blank=True,
        verbose_name="Total Approximation Interval",
        null=True

    )
    minimum_moisture_level = models.FloatField(
        blank=True,
        verbose_name="Minimum Moisture Level",
        null=True
    )
    check_after_hours = models.IntegerField(
        max_length=2,
        verbose_name="Check After Hours",
        blank=True,
        null=True
    )
    time_after_which_shutdown = models.IntegerField(
        max_length=3,
        verbose_name="Time After Which Shutdown",
        blank=True,
        null=True
    )
    state = models.BooleanField(
        blank=True,
        verbose_name="State",
        null=True
    )
    is_done = models.BooleanField(
        default=False,
        blank=False
    )
