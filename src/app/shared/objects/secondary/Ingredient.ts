import {Recipe} from "../Recipe";

export class Ingredient {

  public id: number;
  public title: string;
  public description: string;
  public recipe: Recipe;

  constructor(id: number, title: string, description: string, recipe: Recipe) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.recipe = recipe;
  }
}
