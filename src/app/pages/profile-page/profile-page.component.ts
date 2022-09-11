import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../shared/objects/Recipe";
import {RecipesService} from "../../services/recipes.service";
import {UserStatistic} from "../../shared/objects/UserStatistic";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    id: new FormControl<string>(""),
    userName: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(3)]),
    login: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(3)]),
    password: new FormControl<string>("", Validators.minLength(8)),
    role: new FormControl<string>(""),
    description: new FormControl<string>(""),
  });
  public hidePassword: boolean = true;
  public recipesTitle: string = "";
  public recipesList: Recipe[] = [];
  public statistic: UserStatistic = {
    createdRecipesAmount: 0,
    likedRecipesAmount: 0,
    favoritesRecipesAmount: 0
  };

  constructor(public userService: UserService,
              public recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.userService.userAccount.subscribe(userData => {
      let changeData: any = userData;
      changeData.id = "";
      changeData.password = "";
      this.form.setValue(userData);
      this.userService.getUserStatistic().subscribe( statistic => {
        this.statistic = statistic;
      });
    });

    this.onBlockButtonClick("Мои рецепты");
  }


  onSubmit() {
    if (this.form.invalid) return;
    this.userService.saveUserData(this.form.value).subscribe({
      next: token => {
        this.userService.authService.saveToken(token);
        this.userService.updateProfile();
      },
      error: err => console.warn(err)
    });
  }

  onBlockButtonClick(text: string) {
    this.recipesTitle = text;
    switch (text) {
      case "Мои рецепты": this.userService.getCreatedRecipes().subscribe( recipes => this.recipesList = recipes); break;
      case "Мои лайки": this.userService.getLikes().subscribe(recipes => this.recipesList = recipes); break;
      case "Мои избранные": this.userService.getFavorites().subscribe(recipes => this.recipesList = recipes); break;
    }
  }
}
