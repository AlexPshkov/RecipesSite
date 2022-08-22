import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/objects/Recipe";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {RecipesService} from "../../services/recipes.service";
import {User} from "../../shared/objects/User";
import {AuthRequiredComponent} from "../../modals/auth-required/auth-required.component";

@Component({
  selector: 'recipe-block[recipeObject]',
  templateUrl: './recipe-block.component.html',
  styleUrls: ['./recipe-block.component.scss']
})
export class RecipeBlockComponent implements OnInit {
  @Input()
  public recipeObject!: Recipe;

  public isLike: boolean = false;
  public isFavorite: boolean = false;

  constructor(
    public recipesService: RecipesService,
    public userService: UserService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.checkLikesAndFavorites();
  }

  checkLikesAndFavorites() {
    this.userService.userAccount.subscribe(user => {
      if (user == null) return;
      this.checkLikes(user);
      this.checkFavorites(user);
    });
  }

  checkLikes(user: User): void {
    for (let like of this.recipeObject.likes) {
      if (like.userId != user.id) continue;
      this.isLike = true;
      return;
    }
    this.isLike = false;
  }

  checkFavorites(user: User): void {
    for (let favorite of this.recipeObject.favorites) {
      if (favorite.userId != user.id) continue;
      this.isFavorite = true;
      return;
    }
    this.isFavorite = false;
  }

  likeButton() {
    this.recipesService.putLike(this.recipeObject.id).subscribe({
      next: recipe => this.recipeObject = recipe,
      error: err => this.dialog.open(AuthRequiredComponent, {data: "Ставить лайки могут только авторизованные пользователи."}),
      complete: () => this.checkLikesAndFavorites()
    });
  }

  favoriteButton() {
    this.recipesService.makeFavorite(this.recipeObject.id).subscribe({
      next: recipe => this.recipeObject = recipe,
      error: err => this.dialog.open(AuthRequiredComponent, {data: "Добавлять в избранное могут только авторизованные пользователи."}),
      complete: () => this.checkLikesAndFavorites()
    });
  }
}
