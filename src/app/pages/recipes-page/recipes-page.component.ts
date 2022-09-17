import { Component, OnInit } from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../shared/objects/Recipe";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public recipesList: Recipe[] = []
  public searchControl = new FormControl<string>("");

  constructor(
    public router: Router,
    public usersService: UserService,
    public activatedRoute: ActivatedRoute,
    public recipesService: RecipesService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const searchQuery: string = params['search'];
      if (searchQuery == null) {
        this.loadRecipes();
        return;
      }
      this.makeSearch(searchQuery);
    });
  }

  addRecipe() {
    this.router.navigate(['add-recipe']);
  }

  makeSearch(value: string) {
    this.searchControl.setValue(value);
    this.recipesService.makeSearch(value).subscribe(recipes => {
      this.recipesList = recipes;
    });
  }

  loadRecipes() {
    this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipesList = recipes;
    });
  }

}
