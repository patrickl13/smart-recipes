import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyRecipes} from '../../../models/recipe.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-preview-table',
  templateUrl: './recipe-preview-table.component.html',
  styleUrls: ['./recipe-preview-table.component.scss']
})
export class RecipePreviewTableComponent implements OnInit {
  @Input() recipeInput: MyRecipes;
  @Output() refreshEvent = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  refresh(event): void {
    this.refreshEvent.emit(event);
  }
}
