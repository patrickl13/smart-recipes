import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MyRecipePreview} from '../../../models/recipe.model';
import {RecipeService} from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: MyRecipePreview;
  @Input() viewRecipe: boolean;
  @Output() refreshEvent = new EventEmitter<boolean>();

  constructor(private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  goTo(id: number): void {
   this.viewRecipe ? this.router.navigate(['/recipe/' + id]) : this.router.navigate(['/edit/' + id]);
  }

}
