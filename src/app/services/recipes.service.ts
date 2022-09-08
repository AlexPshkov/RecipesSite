import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../shared/objects/Recipe";
import {apiUrl} from "../app.component";
import {ImageLoaded} from "../shared/responses/ImageLoaded";
import {RecipeCreated} from "../shared/responses/RecipeCreated";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private http: HttpClient) {
  }

  get(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${apiUrl}/recipes/${recipeId}`);
  }

  remove(recipeId: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/recipes/${recipeId}`);
  }

  getAllRecipes(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${apiUrl}/recipes`);
  }

  uploadImage(image: File): Observable<ImageLoaded> {
    const data = new FormData();
    data.append("formFile", image);
    return this.http.post<ImageLoaded>(`${apiUrl}/images`, data);
  }

  uploadRecipe(recipe: Recipe): Observable<RecipeCreated> {
    return this.http.post<RecipeCreated>(`${apiUrl}/recipes`, recipe);
  }

  //====LIKES=====
  putLike(recipeId: number): Observable<Recipe> {
    return this.http.put<Recipe>(`${apiUrl}/recipes/like/${recipeId}`, {});
  }

  //====FAVORITES=====
  makeFavorite(recipeId: number): Observable<Recipe> {
    return this.http.put<Recipe>(`${apiUrl}/recipes/favorite/${recipeId}`, {});
  }
}
