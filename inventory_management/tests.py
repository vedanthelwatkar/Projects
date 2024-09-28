from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Item

# Global setup to initialize the common test setup for all functions
def setUp():
    global client, user, item_data, response
    client = APIClient()
    user = User.objects.create_user(username='testuser', password='testpass')
    client.force_authenticate(user=user)
    item_data = {'name': 'Test Item', 'description': 'Test Description', 'quantity': 10}
    response = client.post('/api/items/', item_data, format='json')

class ItemFunctionTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # This will run once for the test class and set up the initial data.
        setUp()

    def test_create_item(self):
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 1)
        self.assertEqual(Item.objects.get().name, 'Test Item')

    def test_get_item(self):
        item = Item.objects.get()
        response = client.get(f'/api/items/{item.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Item')

    def test_update_item(self):
        item = Item.objects.get()
        updated_data = {'name': 'Updated Item', 'description': 'Updated Description', 'quantity': 20}
        response = client.put(f'/api/items/{item.id}/', updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Item.objects.get().name, 'Updated Item')

    def test_delete_item(self):
        item = Item.objects.get()
        response = client.delete(f'/api/items/{item.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 0)
