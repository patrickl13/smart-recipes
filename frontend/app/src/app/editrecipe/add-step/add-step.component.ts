import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StepUpload} from '../../../models/misc.model';
import {SnackbarService} from '../../../services/snackbar.service';
import {ImageService} from '../../../services/image.service';
import {RecipeImage} from '../../../models/image.model';

@Component({
  selector: 'app-add-step',
  templateUrl: './add-step.component.html',
  styleUrls: ['./add-step.component.scss']
})
export class AddStepComponent implements OnInit {
  instructionsData: string;
  imageFile: File;
  step: StepUpload;
  imageUploadInfo: RecipeImage;

  constructor(public dialogRef: MatDialogRef<AddStepComponent>,
              private imageService: ImageService,
              private snackbar: SnackbarService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.instructionsData = '';
  }

  updateInstructionsData(event): void {
    this.instructionsData = event;
  }

  close(): void {
    this.dialogRef.close();
  }

  updateImageFile(event): void {
    this.imageFile = event;
  }

  uploadImageToRecipe(): void {
    this.imageService.uploadImageToRecipe(this.data.recipeId, this.imageFile).subscribe(
      (data) => {
        this.imageUploadInfo = data;
      },
      () => {
        this.snackbar.error('Error uploading image.', 'Close');
      },
      () => {
        this.step = {
          image: this.imageUploadInfo,
          instructions: this.instructionsData
        };
        this.dialogRef.close({response: this.step});
      }
    );
  }

  addStep(): void {
    this.uploadImageToRecipe();
  }
}
