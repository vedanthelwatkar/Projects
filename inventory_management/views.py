# inventory_management/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from .models import Item
from .serializers import ItemSerializer
import logging

logger = logging.getLogger(__name__)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        return obj

    def perform_create(self, serializer):
        logger.info(f"Creating new item: {serializer.validated_data['name']}")
        serializer.save()

    def perform_update(self, serializer):
        logger.info(f"Updating item: {serializer.instance.id}")
        serializer.save()

    def perform_destroy(self, instance):
        logger.info(f"Deleting item: {instance.id}")
        instance.delete()