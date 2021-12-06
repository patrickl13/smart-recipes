import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  @Input() ingredientsInput: [];
  @Output() ingredientsOutput = new EventEmitter<{}>();
  ingredientsForm: FormGroup;
  ingredients = [];

  constructor(private fb: FormBuilder) {
    this.ingredientsForm = this.fb.group({
      ingredientField: new FormControl('')
    });
  }

  get ingredientToAdd(): AbstractControl { return this.ingredientsForm.get('ingredientField'); }

  ngOnInit(): void {
    this.ingredients = this.ingredientsInput;
  }

  addIngredient(): void {
    this.ingredients.push(this.ingredientToAdd.value);
    this.ingredientToAdd.setValue('');
    this.ingredientsOutput.emit(this.ingredients);
  }

  removeIngredient(ingredient: string): void {
   const index = this.ingredients.indexOf(ingredient);
   if (index > -1) {
      this.ingredients.splice(index, 1);
    }
   this.ingredientsOutput.emit(this.ingredients);
  }
}
