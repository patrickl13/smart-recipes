import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '../../../services/image.service';
import {ActivatedRoute} from '@angular/router';
import {ConfirmDialogService} from '../../../services/confirm-dialog.service';
import {SnackbarService} from '../../../services/snackbar.service';
import {RecipeImage} from '../../../models/image.model';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})

export class ImageListComponent implements OnInit {
  image: any;
  images: RecipeImage[];
  recipeId = Number(this.route.snapshot.paramMap.get('id'));

  constructor(private imageService: ImageService,
              private route: ActivatedRoute,
              private dialogService: ConfirmDialogService,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getRecipeImages();
  }

  imageInputChange(fileInputEvent: any): void {
    this.image = fileInputEvent.target.files[0];
    this.uploadImageToRecipe();
  }

  confirmDeleteImage(id: number): void {
    const options = {
      title: 'Image will be deleted',
      message: 'You are deleting a image, this process cannot be undone.',
      cancelText: 'CANCEL',
      confirmText: 'DELETE'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteImageById(id);
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
        this.getRecipeImages();
      }
    );
  }

  getRecipeImages(): void {
    this.imageService.getImagesForRecipe(this.recipeId).subscribe(
      (data) => {
        this.images = data;
      },
      () => {
        this.snackbar.error('Could not retrieve recipe images.', 'Close');
      },
      () => {
        this.imageService.images.emit(this.images);
      }
    );
  }
  uploadImageToRecipe(): void {
    this.imageService.uploadImageToRecipe(this.recipeId, this.image).subscribe(
      () => {},
      () => {
        this.snackbar.error('Error uploading image.', 'Close');
      },
      () => {
        this.snackbar.success('Image uploaded successfully.', 'Close');
        this.getRecipeImages();
      }
    );
  }
}
