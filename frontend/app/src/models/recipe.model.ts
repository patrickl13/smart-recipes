import {RecipeImage} from './image.model';

export interface RecipeModel {
  id: number;
  category: string;
  ingredients: string;
  instructions: string;
  time: number;
  title: string;
  username: string;
}

export interface MyRecipePreview {
  id: number;
  ingredients: string;
  instructions: string;
  username: string;
  time: number;
  title: string;
}

export interface MyRecipes {
  recipes: MyRecipePreview [];
}

export interface Recipes {
  recipes: RecipeModel [];
}

export enum CategoryEnum {
  CHICKEN,
  BEEF,
  PORK,
  VEGETARIAN,
  VEGAN,
  DINNER,
  LUNCH,
  BREAKFAST,
  SLOWCOOKER,
  BAKED,
  BUDGET,
  QUICK,
  EASY,
  COCKTAIL
}

export interface Recipe {
  title: string;
  time_minutes: number;
  category: string;
  ingredients: [];
  thumbnail?: RecipeImage [];
  steps: Step [];
}

export interface CreatedRecipe {
  id: number;
  title: string;
  category: string;
  ingredients: [];
  time_minutes: number;
  thumbnail?: RecipeImage [];
  steps: [];
}

export interface RecipeListItem {
  id: number;
  title: string;
  time_minutes: number;
  category: string;
  ingredients: [];
  thumbnail?: RecipeImage;
}

export interface Step {
  image: RecipeImage;
  instructions: string;
}
