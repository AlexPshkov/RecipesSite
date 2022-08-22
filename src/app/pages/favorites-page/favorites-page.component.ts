import { Component, OnInit } from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../shared/objects/Recipe";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  public favorites: Observable<Recipe[]> | undefined;

  constructor(
    public recipeService: RecipesService
  ) { }

  ngOnInit(): void {
    this.favorites = this.recipeService.getFavorites();
  }

}
