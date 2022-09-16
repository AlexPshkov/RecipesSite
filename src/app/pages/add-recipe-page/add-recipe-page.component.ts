import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../shared/objects/Recipe";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../shared/objects/secondary/Ingredient";
import {Step} from "../../shared/objects/secondary/Step";
import {Tag} from "../../shared/objects/secondary/Tag";

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRecipePageComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    id: new FormControl<number>(0),
    favoritesAmount: new FormControl<number>(0),
    likesAmount: new FormControl<number>(0),
    userLogin: new FormControl<string>(""),
    isCreator: new FormControl<boolean>(true),
    isLiked: new FormControl<boolean>(false),
    isFavorite: new FormControl<boolean>(false),
    ingredients: new FormControl<Ingredient[]>([ { id: 0, title: "", description: "", recipeId: 0 } ], Validators.required),
    steps: new FormControl<Step[]>([ { id: 0, description: "", recipeId: 0 } ], Validators.required),
    recipeName: new FormControl<string>("", Validators.required),
    recipeDescription: new FormControl<string>("", Validators.required),
    imagePath: new FormControl<string>("", Validators.required),
    requiredTime: new FormControl<string>("", Validators.required),
    servingsAmount: new FormControl<string>("", Validators.required),
    tags: new FormControl<Tag[]>([]),
  });
  public availableTimes: number[] = [];
  public availableServings: number[] = [];
  public imageFile: File | undefined;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public recipesService: RecipesService) {
  }

  ngOnInit(): void {
    for (let i = 5; i <= 120; i += 5) this.availableTimes.push(i);
    for (let i = 1; i <= 5; i++) this.availableServings.push(i);

    this.activatedRoute.params.subscribe(params => {
      const recipeId: number = params['recipeId'];
      if (recipeId == null) return;
      this.recipesService.get(recipeId).subscribe(recipe => {
        this.form.setValue(recipe);
      });
    });
  }

  onSubmit() {
    const rec: Recipe = this.form.value;

    if (this.imageFile == undefined) {
      this.form.updateValueAndValidity();
      return;
    }

    this.recipesService.uploadImage(this.imageFile).subscribe(res => {
      rec.imagePath = res.imagePath;
      this.recipesService.uploadRecipe(rec).subscribe(res => {
        this.router.navigate(['recipe', { recipeId: res.recipeId }])
      });
    });
  }

  onImageChange(image : File) {
    this.imageFile = image;
  }
}
