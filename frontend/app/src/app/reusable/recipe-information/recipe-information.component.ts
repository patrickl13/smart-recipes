import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CategoryEnum} from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-information',
  templateUrl: './recipe-information.component.html',
  styleUrls: ['./recipe-information.component.scss']
})
export class RecipeInformationComponent implements OnInit {
  @Input() titleInput: string;
  @Input() categoryInput: string;
  @Input() timeInput: number;
  @Output() titleOutput = new EventEmitter<string>();
  @Output() categoryOutput = new EventEmitter<string>();
  @Output() timeOutput = new EventEmitter<number>();
  categories = CategoryEnum;
  categoryOptions: any[];
  selected: string;
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: new FormControl(''),
      category: new FormControl(''),
      time: new FormControl('')
    });
  }

  get title(): AbstractControl { return this.recipeForm.get('title'); }
  get category(): AbstractControl { return this.recipeForm.get('category'); }
  get time(): AbstractControl { return this.recipeForm.get('time'); }

  ngOnInit(): void {
    this.title.setValue(this?.titleInput);
    this.selected = this?.categoryInput;
    this.time.setValue(this?.timeInput);

    // filter out numbers from array
    this.categoryOptions = Object.values(this.categories).filter(item => !Number.isInteger(item as number));
  }
}
