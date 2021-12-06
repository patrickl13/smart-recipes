import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreatedRecipe, Recipe, RecipeListItem} from '../models/recipe.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  createRecipe(recipe: Recipe): Observable<CreatedRecipe> {
    return this.http.post<CreatedRecipe>('/backend/api/recipe/recipes/', recipe);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`/backend/api/recipe/recipes/${id}/`);
  }

  updateRecipeById(id: number, recipe: Recipe): Observable<CreatedRecipe> {
    return this.http.put<CreatedRecipe>(`/backend/api/recipe/recipes/${id}/`, recipe);
  }

  getUserRecipes(): Observable<RecipeListItem[]> {
    return this.http.get<RecipeListItem[]>(`/backend/api/recipe/recipes/`);
  }

  deleteRecipeById(id: number): Observable<any> {
    return this.http.delete<any>(`/backend/api/recipe/recipes/${id}/`);
  }

  getAllRecipes(): Observable<RecipeListItem[]> {
    return this.http.get<RecipeListItem[]>(`/backend/api/recipe/all-recipes/`);
  }

  getUnownedRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`/backend/api/recipe/all-recipes/${id}/`);
  }

  getRecipeUser(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`/backend/api/recipe/user-info/${id}/`);
  }
}
