import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {EditRecipeComponent} from './editrecipe/edit-recipe.component';
import {MyRecipesComponent} from './myrecipes/myrecipes.component';
import {AllRecipesComponent} from './allrecipes/allrecipes.component';
import {ViewRecipeComponent} from './viewrecipe/viewrecipe.component';
import {LandingComponent} from './landing/landing.component';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'edit/:id', component: EditRecipeComponent, canActivate: [AuthGuard]},
  {path: 'myrecipes', component: MyRecipesComponent, canActivate: [AuthGuard]},
  {path: 'allrecipes', component: AllRecipesComponent},
  {path: 'view/:id', component: ViewRecipeComponent},
  {path: '', component: LandingComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
