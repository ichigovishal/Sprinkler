from rest_framework import serializers
from .models import Actions
from django.contrib.auth import get_user_model as user
from rest_framework import permissions


class SprinklerDataSerializers(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = Actions
        fields = '__all__'

    is_done = serializers.BooleanField(
        default=False,
        read_only=True
    )
