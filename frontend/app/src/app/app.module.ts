import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '../interceptors/header-interceptor';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import { EditRecipeComponent } from './editrecipe/edit-recipe.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule} from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatSelectModule} from '@angular/material/select';
import { TextEditorComponent } from './reusable/text-editor/text-editor.component';
import { RecipeInformationComponent } from './reusable/recipe-information/recipe-information.component';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { RecipePreviewTableComponent } from './reusable/recipe-preview-table/recipe-preview-table.component';
import { RecipeCardComponent } from './reusable/recipe-card/recipe-card.component';
import {MarkdownModule} from 'ngx-markdown';
import { ConfirmDialogComponent } from './reusable/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageListComponent } from './reusable/image-list/image-list.component';
import { IngredientsListComponent } from './reusable/ingredients-list/ingredients-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MyRecipesComponent } from './myrecipes/myrecipes.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AllRecipesComponent } from './allrecipes/allrecipes.component';
import { ViewRecipeComponent } from './viewrecipe/viewrecipe.component';
import {MatDividerModule} from '@angular/material/divider';
import { LandingComponent } from './landing/landing.component';
import { AddStepComponent } from './editrecipe/add-step/add-step.component';
import { ImageUploadComponent } from './reusable/image-upload/image-upload.component';
import { StepListComponent } from './editrecipe/step-list/step-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditRecipeComponent,
    SignupComponent,
    TextEditorComponent,
    RecipeInformationComponent,
    HeaderComponent,
    RecipePreviewTableComponent,
    RecipeCardComponent,
    ConfirmDialogComponent,
    ImageListComponent,
    IngredientsListComponent,
    MyRecipesComponent,
    AllRecipesComponent,
    ViewRecipeComponent,
    LandingComponent,
    AddStepComponent,
    ImageUploadComponent,
    StepListComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatInputModule,
        MatCardModule,
        HttpClientModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule,
        CKEditorModule,
        MatSelectModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MarkdownModule.forRoot()
    ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
