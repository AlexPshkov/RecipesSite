import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../shared/objects/Recipe";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../shared/objects/secondary/Ingredient";
import {Step} from "../../shared/objects/secondary/Step";
import {Tag} from "../../shared/objects/secondary/Tag";
import {imagesUrl} from "../../app.component";

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRecipePageComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    recipeName: new FormControl<string>("", Validators.required),
    recipeDescription: new FormControl<string>("", Validators.required),
    imagePath: new FormControl<string>("", Validators.required),
    requiredTime: new FormControl<string>("", Validators.required),
    servingsAmount: new FormControl<string>("", Validators.required),
  });
  public imageUrl = imagesUrl;


  public availableTimes: number[] = [];
  public availableServings: number[] = [];

  public recipeTags: Tag[] = [];
  public recipeIngredients: Ingredient[] = [{id: 0, title: "", description: "", recipeId: 0}];
  public recipeSteps: Step[] = [{id: 0, description: "", recipeId: 0}];


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
    rec.ingredients = this.recipeIngredients;
    rec.steps = this.recipeSteps;
    rec.tags = this.recipeTags;
    console.log(rec);
    this.recipesService.uploadRecipe(rec).subscribe(res => {
      console.log(res);
    });
  }

  onImageChange(image: File) {
    this.recipesService.uploadImage(image).subscribe(res => {
      this.form.controls["imagePath"].setValue( res.imagePath);
    });
  }

  addNewIngredient() {
    this.recipeIngredients.push({id: 0, title: "", description: "", recipeId: 0})
  }

  addNewStep() {
    this.recipeSteps.push({id: 0, description: "", recipeId: 0})
  }

  removeIngredient(number: number) {
    this.recipeIngredients.splice(number, 1)
  }

  removeStep(number: number) {
    this.recipeSteps.splice(number, 1)
  }

}
