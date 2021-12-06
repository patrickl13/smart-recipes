import tempfile
import os
import json
from PIL import Image
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Recipe

from recipe.serializers import RecipeSerializer

RECIPES_URL = reverse('recipe:recipe-list')

# /api/recipe/recipes
# /api/recipe/recipes/:id


def image_upload_url(recipe_id):
    """return URL for recipe image upload"""
    return reverse('recipe:recipe-upload-image', args=[recipe_id])


def detail_url(recipe_id):
    """return recipe detail URL"""
    return reverse('recipe:recipe-detail', args=[recipe_id])

def sample_recipe(user, **params):
    """Create and return a sample recipe"""
    ingredients= ['eggs', 'flour']
    defaults = {
        'title': 'sample recipe',
        'time_minutes': 10,
        'category': 'CHICKEN',
        'ingredients': ingredients,
        'instructions': 'test instructions'
    }
    defaults.update(params)

    return Recipe.objects.create(user=user, **defaults)


class PublicRecipeApiTests(TestCase):
    """Test unauthenticated recipe API access"""
    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test authentication is required"""
        res = self.client.get(RECIPES_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateRecipeApiTests(TestCase):
    """Test unauthenticated recipe API access"""
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    # def test_retrieve_recipes(self):
    #     """Test retrieving a list of recipes"""
    #     sample_recipe(user=self.user)
    #     sample_recipe(user=self.user)
    #
    #     res = self.client.get(RECIPES_URL)
    #
    #     recipes = Recipe.objects.all().order_by('-id')
    #     serializer = RecipeSerializer(recipes, many=True)
    #     self.assertEqual(res.status_code, status.HTTP_200_OK)
    #     self.assertEqual(res.data, serializer.data)
    #
    # def test_recipes_limited_to_user(self):
    #     """Test retrieving recipes for user"""
    #     user2 = get_user_model().objects.create_user(
    #         'other@gmail.com',
    #         'pass123'
    #     )
    #     sample_recipe(user=user2)
    #     sample_recipe(user=self.user)
    #
    #     res = self.client.get(RECIPES_URL)
    #     recipes = Recipe.objects.filter(user=self.user)
    #     serializer = RecipeSerializer(recipes, many=True)
    #     self.assertEqual(res.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(res.data), 1)
    #     self.assertEqual(res.data, serializer.data)

    def test_create_empty_recipe(self):
        payload = {
            'title': '',
            'time_minutes': 0,
            'category': '',
            'ingredients': [],
            'instructions': ''
        }
        res = self.client.post(RECIPES_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipe = Recipe.objects.get(id=res.data['id'])
        for key in payload.keys():
            if key == 'ingredients':
                self.assertEqual(payload[key], [])
            else:
                self.assertEqual(payload[key], getattr(recipe, key))

    def test_create_basic_recipe(self):
        """test creating recipe"""
        ingredients = ['eggs', 'flour']
        payload = {
            'title': 'Chocolate cheesecake',
            'time_minutes': 30,
            'category': 'DESSERT',
            'ingredients': ingredients,
            'instructions': 'mix and bake 350'
        }

        res = self.client.post(RECIPES_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipe = Recipe.objects.get(id=res.data['id'])
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(recipe, key))

    def test_partial_update_recipe(self):
        """test updating a recipe with patch"""
        recipe = sample_recipe(user=self.user)
        payload = {
            'title': 'Chicken tikka',
            'instructions': 'bake at 350'
        }

        url = detail_url(recipe.id)
        self.client.patch(url, payload)

        recipe.refresh_from_db()
        self.assertEqual(recipe.title, payload['title'])
        self.assertEqual(recipe.instructions, payload['instructions'])

    def test_full_update_recipe(self):
        """test updating recipe with put"""
        recipe = sample_recipe(user=self.user)
        ingredients = ['chicken', 'sauce']
        payload = {
            'title': 'chicken tikka',
            'time_minutes': 30,
            'category': 'CHICKEN',
            'ingredients': ingredients,
            'instructions': 'fry in pan, serve on rice'

        }
        url = detail_url(recipe.id)
        self.client.put(url, payload)

        recipe.refresh_from_db()
        recipe = Recipe.objects.get(id=recipe.id)
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(recipe, key))


class RecipeImageUploadTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)
        self.recipe = sample_recipe(user=self.user)

    def tearDown(self):
        self.recipe.image.delete()

    def test_upload_image_to_recipe(self):
        """Test uploading image to recipe"""
        url = image_upload_url(self.recipe.id)
        with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
            img = Image.new('RGB', (10, 10))
            img.save(ntf, format='JPEG')
            ntf.seek(0)
            res = self.client.post(url, {'image': ntf}, format='multipart')

        self.recipe.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('image', res.data)
        self.assertTrue(os.path.exists(self.recipe.image.path))

    def test_upload_image_bad_request(self):
        """Test uploading invalid image"""
        url = image_upload_url(self.recipe.id)
        res = self.client.post(url, {'image': 'notimage'}, format='multipart')

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)




