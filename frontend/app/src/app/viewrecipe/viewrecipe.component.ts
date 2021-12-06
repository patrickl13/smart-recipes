import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-viewrecipe',
  templateUrl: './viewrecipe.component.html',
  styleUrls: ['./viewrecipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  recipeId = Number(this.route.snapshot.paramMap.get('id'));
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private snackbar: SnackbarService,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipeService.getUnownedRecipeById(this.recipeId).subscribe(
      (data) => {
        this.recipe = data;
      },
      () => {
        this.snackbar.error('Error getting recipe.', 'Close');
      },
      () => {
      }
    );
  }
}
