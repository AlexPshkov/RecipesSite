import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {Recipe} from "../shared/objects/Recipe";
import {apiUrl} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  get(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${apiUrl}/recipes/${recipeId}`);
  }

  getFavorites(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${apiUrl}/recipes/favorites`);
  }

  getAllRecipes(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${apiUrl}/recipes`);
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
