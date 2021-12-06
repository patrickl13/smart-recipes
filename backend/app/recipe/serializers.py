from rest_framework import serializers
from core.models import Recipe, DropBox


class RecipeSerializer(serializers.ModelSerializer):
    """Serialize a recipe"""

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'time_minutes', 'category', 'ingredients','thumbnail', 'steps')
        read_only_fields = ('id',)


class RecipeImageSerializer(serializers.ModelSerializer):
    """serializer for uploading images to recipe"""

    class Meta:
        model = Recipe
        fields = ('id', 'image')
        read_only_fields = ('id',)


class DropBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = DropBox
        fields = ('id', 'title', 'document','recipe')
        read_only_fields = ('id',)