from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import SprinklerData

# Register your models here.

admin.site.register(SprinklerData)

