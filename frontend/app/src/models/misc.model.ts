import {RecipeImage} from './image.model';

export interface Message {
  message: string;
}

export interface ConfirmDialog {
  cancelText: string;
  confirmText: string;
  message: string;
  title: string;
}

export interface StepUpload {
  image: RecipeImage;
  instructions: string;
}
