import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/objects/Recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../../services/recipes.service";
import {MatDialog} from "@angular/material/dialog";
import {RecipeDeleteDialogComponent} from "../../modals/recipe-delete-dialog/recipe-delete-dialog.component";

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {

  @Input()
  public recipeObject: Recipe = {
    id: 0,
    imagePath: "",
    recipeName: "Загрузка...",
    recipeDescription: "",
    userLogin: "загрузка",
    requiredTime: "",
    servingsAmount: "",
    likesAmount: 0,
    favoritesAmount: 0,
    isLiked: false,
    isCreator: false,
    isFavorite: false,
    steps: [],
    tags: [],
    ingredients: []
  }

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const recipeId: number = params['recipeId'];
      this.recipesService.get(recipeId).subscribe(recipe => {
        this.recipeObject = recipe;
      });
    });
  }

  editRecipe() {
    this.router.navigate(['add-recipe', {"recipeJson": JSON.stringify(this.recipeObject) }]);
  }

  removeRecipe() {
    this.dialog.open(RecipeDeleteDialogComponent, { data: this.recipeObject })
  }


}
