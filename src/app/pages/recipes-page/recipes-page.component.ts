import { Component, OnInit } from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../shared/objects/Recipe";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public availableRecipes: Observable<Recipe[]> | undefined;

  constructor(
    public router: Router,
    public usersService: UserService,
    public recipesService: RecipesService) {

  }

  ngOnInit(): void {
    this.availableRecipes = this.recipesService.getAllRecipes();
  }

  addRecipe() {
    this.router.navigate(['add-recipe']);
  }


}
