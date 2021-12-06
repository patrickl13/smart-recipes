import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserInfo} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {CreatedRecipe, Recipe} from '../../models/recipe.model';
import {RecipeService} from '../../services/recipe.service';
import {SnackbarService} from '../../services/snackbar.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private loading: boolean;
  guidance: string;
  error: boolean;
  recipe: Recipe;
  createdRecipe: CreatedRecipe;
  private userSub: Subscription;
  isLoggedIn = false;

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private recipeService: RecipeService,
              private snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) =>  {
        this.isLoggedIn = !!user;
      }
    );
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  goTo(url: string): void {
    this.router.navigate([url]);
    this.closeNav();
  }



  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackbar.success('User successfully logged out.', 'Close');
  }

  openNav(): void {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav(): void {
    document.getElementById('mySidenav').style.width = '0';
  }

  createNewRecipe(): void {
    this.recipe = {
      title: '',
      category: '',
      time_minutes: 0,
      ingredients: [],
      thumbnail: [],
      steps: []
    };

    this.recipeService.createRecipe(this.recipe).subscribe(
      (data) => {
        this.createdRecipe = data;
      },
      () => {
      this.snackbar.error('Could not create recipe.', 'Close');
      },
      () => {
        this.goTo('edit/' + this.createdRecipe.id);
      }
    );
  }
}
