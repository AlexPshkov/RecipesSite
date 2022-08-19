import { Component, OnInit } from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../shared/objects/Recipe";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public availableRecipes: Observable<Recipe[]> | undefined;

  constructor(public recipesService: RecipesService) { }

  ngOnInit(): void {
    this.availableRecipes = this.recipesService.getAllRecipes();
  }


}
