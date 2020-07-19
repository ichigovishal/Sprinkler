from rest_framework import viewsets
from .serializer import SprinklerDataSerializers
from .models import SprinklerData
from rest_framework import permissions


class SprinklerDataViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing accounts.
    """
    queryset = SprinklerData.objects.all()
    serializer_class = SprinklerDataSerializers
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        date = self.request.GET.get('date', None)
        if pk is not None:
            return SprinklerData.objects.order_by("-time")[:pk]
        elif date is not None:
            return SprinklerData.objects.filter(time__date=date)
        else:
            return SprinklerData.objects.order_by("-time")


