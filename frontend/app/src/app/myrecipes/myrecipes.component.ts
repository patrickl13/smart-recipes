import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {Recipe, RecipeListItem, Step} from '../../models/recipe.model';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {ConfirmDialogService} from '../../services/confirm-dialog.service';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.scss']
})
export class MyRecipesComponent implements OnInit {
  recipes: RecipeListItem[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private snackbar: SnackbarService,
              private dialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getMyRecipes();
  }

  getMyRecipes(): void {
    this.recipeService.getUserRecipes().subscribe(
      (data) => {
        this.recipes = data;
      },
      () => {
        this.snackbar.error('Could not retrieving your recipes.', 'Close');
      }
    );
  }

  deleteRecipe(id: number): void {
    this.recipeService.deleteRecipeById(id).subscribe(
      () => {},
      () => {
        this.snackbar.error('Could not delete recipe.', 'Close');
      },
      () => {
        this.snackbar.success('Recipe successfully deleted.', 'Close');
        this.getMyRecipes();
      }
    );
  }

  confirmDeleteRecipe(id: number): void {
    const options = {
      title: 'Recipe will be deleted',
      message: 'You are deleting a recipe, this process cannot be undone.',
      cancelText: 'CANCEL',
      confirmText: 'DELETE'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteRecipe(id);
      }
    });
  }

  createNewRecipe(): void {
    const recipe: Recipe = {
      title: '',
      category: '',
      time_minutes: 0,
      ingredients: [],
      thumbnail: [],
      steps: []
    };
    let id = 0;

    this.recipeService.createRecipe(recipe).subscribe(
      (data) => {
        id = data.id;
      },
      () => {
        this.snackbar.error('Could not create recipe.', 'Close');
      },
      () => {
        this.router.navigate(['edit/' + id]);
      }
    );
  }

}
