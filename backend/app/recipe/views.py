from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status, parsers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Recipe, User, DropBox

from recipe import serializers


class RecipeViewSet(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.RecipeSerializer
    queryset = Recipe.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'upload_image':
            return serializers.RecipeImageSerializer
        else:
            return serializers.RecipeSerializer

    def get_queryset(self):
        authentication_classes = ()
        permission_classes = ()
        """Return objects for the current authenticated user only"""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(recipe__isnull=False)

        return queryset.filter(
            user=self.request.user
        ).order_by('-title').distinct()

    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a recipe"""
        recipe = self.get_object()
        serializer = self.get_serializer(
            recipe,
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class AllRecipesViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        queryset = self.queryset
        return queryset.filter().all()


class DropBoxViewSet(viewsets.ModelViewSet):
    """upload an image to the S3 service"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = DropBox.objects.all()
    serializer_class = serializers.DropBoxSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    http_method_names = ['post', 'patch', 'delete']


class AllRecipeImagesViewSet(viewsets.ModelViewSet):
    """Return the images for a recipe"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = DropBox.objects.all()
    serializer_class = serializers.DropBoxSerializer
    http_method_names = ['get']

    def get_queryset(self):
        recipe_id = self.request.GET.get('recipe')
        queryset = self.queryset
        return queryset.filter(recipe=recipe_id)