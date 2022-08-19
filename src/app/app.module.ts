import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import {MatRippleModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { SearchComponent } from './elements/search/search.component';
import { RecipeBlockComponent } from './elements/recipe-block/recipe-block.component';
import { TagBlockComponent } from './elements/tag-block/tag-block.component';
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import { HttpClientModule } from '@angular/common/http';
import { RegisterDialogComponent } from './modals/register-dialog/register-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { LoginDialogComponent } from './modals/login-dialog/login-dialog.component';
import { AddRecipeWarnDialogComponent } from './modals/add-recipe-warn-dialog/add-recipe-warn-dialog.component';
import {TOKEN_KEY} from "./services/auth.service";
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: "main-page", component: MainPageComponent, title: "Главная"},
  {path: "recipes", component: RecipesPageComponent, title: "Рецепты"},
  {path: "favorite", component: FavoritesPageComponent, title: "Избранное", canActivate: [AuthGuard]},
  {path: "profile", component: ProfilePageComponent, title: "Профиль", canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'main-page'}
];

/**
 * Token getter implementation
 */
export function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY)
}

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        RecipesPageComponent,
        FavoritesPageComponent,
        SearchComponent,
        RecipeBlockComponent,
        TagBlockComponent,
        RegisterDialogComponent,
        LoginDialogComponent,
        AddRecipeWarnDialogComponent,
        ProfilePageComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.backendApi]
      }
    }),
    MatRippleModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
