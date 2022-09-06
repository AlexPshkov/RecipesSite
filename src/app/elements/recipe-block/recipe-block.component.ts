import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/objects/Recipe";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {RecipesService} from "../../services/recipes.service";
import {AuthRequiredComponent} from "../../modals/auth-required/auth-required.component";
import {imagesUrl} from "../../app.component";

@Component({
  selector: 'recipe-block[recipeObject]',
  templateUrl: './recipe-block.component.html',
  styleUrls: ['./recipe-block.component.scss']
})
export class RecipeBlockComponent implements OnInit {
  public imageUrl = imagesUrl;

  @Input()
  public recipeObject!: Recipe;

  constructor(
    public recipesService: RecipesService,
    public userService: UserService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  likeButton() {
    this.recipesService.putLike(this.recipeObject.id).subscribe({
      next: recipe => this.recipeObject = recipe,
      error: err => this.dialog.open(AuthRequiredComponent, {data: "Ставить лайки могут только авторизованные пользователи."})
    });
  }

  favoriteButton() {
    this.recipesService.makeFavorite(this.recipeObject.id).subscribe({
      next: recipe => this.recipeObject = recipe,
      error: err => this.dialog.open(AuthRequiredComponent, {data: "Добавлять в избранное могут только авторизованные пользователи."})
    });
  }
}
