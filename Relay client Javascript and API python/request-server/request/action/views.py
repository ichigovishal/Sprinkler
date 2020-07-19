from rest_framework import viewsets
from .serializer import SprinklerDataSerializers
from .models import Actions
from rest_framework import permissions


class ActionViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing accounts.
    """
    queryset = Actions.objects.all()
    serializer_class = SprinklerDataSerializers
    http_method_names = ['get', 'post']
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = "is_done"

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        print(self.request.GET.get('is_done', None))
        if pk is None:
            return Actions.objects.order_by("-id") if self.request.GET.get('is_done', None) is None else Actions.objects.filter(is_done=self.request.GET.get('is_done', None))
        else:
            return Actions.objects.filter(id=pk)

