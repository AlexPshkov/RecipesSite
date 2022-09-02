import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../shared/objects/Recipe";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExternalHtmlService} from "../../services/external-html.service";

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.scss']
})
export class AddRecipePageComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    recipeName: new FormControl<string>("", Validators.required),
    recipeDescription: new FormControl<string>("", Validators.required),
    imageURL: new FormControl<string>("", Validators.required),
    requiredTime: new FormControl<string>("", Validators.required),
    servingsAmount: new FormControl<string>("", Validators.required),
    tags: new FormControl<string>(""),
    ingredients: new FormControl<string>(""),
    steps: new FormControl<string>(""),
  });

  public availableTimes: number[] = [];
  public availableServings: number[] = [];


  constructor(
    public router: Router,
    public usersService: UserService,
    public recipesService: RecipesService) {
  }

  ngOnInit(): void {
    for (let i = 5; i <= 120; i += 5) this.availableTimes.push(i);
    for (let i = 1; i <= 5; i++) this.availableServings.push(i);
  }

  onSubmit() {
    const rec: Recipe = this.form.value;
    console.log(rec)
  }

}
