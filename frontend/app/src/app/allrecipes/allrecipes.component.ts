import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {RecipeListItem} from '../../models/recipe.model';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-allrecipes',
  templateUrl: './allrecipes.component.html',
  styleUrls: ['./allrecipes.component.scss']
})
export class AllRecipesComponent implements OnInit {
  recipes: RecipeListItem[];
  pending = false;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private snackbar: SnackbarService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.recipes = [];
    this.getAllRecipes();
  }

  getAllRecipes(): void {
    this.pending = true;
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        this.recipes = data;
        this.pending = false;
      },
      () => {
        this.snackbar.error('Could not retrieving your recipes.', 'Close');
      }
    );
  }
}
