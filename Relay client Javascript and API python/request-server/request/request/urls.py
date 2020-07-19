"""request URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework import routers
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from API.views import SprinklerDataViewSet
from action.views import ActionViewSet

app_name = 'API'
router = routers.DefaultRouter()
# router = routers.SimpleRouter()
router.register(r'sprinklerdata', SprinklerDataViewSet)
router.register(r'actions', ActionViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    path('actions/<int:pk>/', ActionViewSet.as_view({'get': 'list'}), name='action'),
    url('api/', include('API.urls')),
    url('api/', include(router.urls)),
]
