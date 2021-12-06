import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {RecipeImage} from '../../../models/image.model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Output() imageFileOutput = new EventEmitter<File>();
  @Output() imageDeleteOutput = new EventEmitter<number>();
  @Input() defaultImage: RecipeImage;
  image: string;
  imageFile: File;

  constructor() { }

  ngOnInit(): void {
    if (this.defaultImage) {
      this.image = this.defaultImage.document;
    }
  }

  imageInputChange(fileInputEvent: any): void {
    this.imageFile = fileInputEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = () => {
      this.image = reader.result as string;
    };
    this.imageFileOutput.emit(this.imageFile);
  }

  removeImage(): void {
    this.image = null;
    this.imageFile = null;
    this.defaultImage = null;
    this.imageDeleteOutput.emit(this.defaultImage.id);
  }

}
