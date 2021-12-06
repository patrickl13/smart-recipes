import {Component, OnInit} from '@angular/core';
import {CategoryEnum, Recipe, Step} from '../../models/recipe.model';
import {UserService} from '../../services/user.service';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';
import {RecipeImage} from '../../models/image.model';
import {ImageService} from '../../services/image.service';
import {AddStepComponent} from './add-step/add-step.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  ingredientsData: [];
  instructionsData: string;
  title: string;
  category: string;
  categories = CategoryEnum;
  time: number;
  loading: boolean;
  error: boolean;
  recipe: Recipe;
  updatedRecipe: Recipe;
  images: RecipeImage[];
  steps: Step [];
  recipeId = Number(this.route.snapshot.paramMap.get('id'));
  thumbnailFile: File;
  thumbnailUpload: RecipeImage;

  constructor(private userService: UserService,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: SnackbarService,
              private imageService: ImageService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ingredientsData = [];
    this.instructionsData = '';
    this.steps = [];
    this.getRecipe();
  }

  refresh(): void {
    this.ngOnInit();
  }

  getRecipe(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe(
      (data) => {
        this.recipe = data;
        this.ingredientsData = this.recipe.ingredients;
        this.steps = this.recipe.steps;
        this.thumbnailUpload = this.recipe.thumbnail[0];
        },
      () => {
        this.snackbar.error('Error getting recipe.', 'Close');
      }
    );
  }

  updateThumbnailFile(event): void {
    if (event) {
      this.thumbnailFile = event;
      this.uploadThumbnail();
    } else if (!event && this.thumbnailUpload) {
      this.deleteImageById(this.thumbnailUpload.id);
    }
  }

  uploadThumbnail(): void {
    this.imageService.uploadImageToRecipe(this.recipeId, this.thumbnailFile).subscribe(
      (data) => {
        this.thumbnailUpload = data;
      },
      () => {
        this.snackbar.error('Error uploading image.', 'Close');
      },
      () => {
        this.updateRecipe();
      }
    );
  }

  updateRecipe(): void {
    this.updatedRecipe = {
      title: this.title,
      category: this.category,
      time_minutes: this.time,
      ingredients: this.ingredientsData,
      thumbnail: [this.thumbnailUpload],
      steps: this.steps
    };

    this.recipeService.updateRecipeById(this.recipeId, this.updatedRecipe).subscribe(
      () => {},
      () => {
        this.snackbar.error('Error updating recipe.', 'Close');
      },
      () => {
        this.snackbar.success('Recipe updated successfully.', 'Close');
        this.getRecipe();
      }
    );
  }

  openAddStepDialog(editMode: boolean): void {
    const dialogRef = this.dialog.open(AddStepComponent, {
      height: '600px',
      width: '600px',
      data: {recipeId: this.recipeId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.response) {
        this.steps.push(result.response);
      }
    });
  }

  deleteImageById(id: number): void {
    this.imageService.deleteImageById(id).subscribe(
      () => {},
      () => {
        this.snackbar.error('Could not delete image.', 'Close');
      },
      () => {
        this.snackbar.success('Successfully deleted image.', 'Close');
      }
    );
  }

  updateIngredientsData(event): void {
    this.ingredientsData = event;
  }

  updateTitle(event): void {
    this.title = event;
  }

  updateTime(event): void {
    this.time = event;
  }

  updateCategory(event): void {
    this.category = event;
  }

  updateSteps(event): void {
    this.steps = event;
  }

}
