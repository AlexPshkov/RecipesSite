import {Recipe} from "../Recipe";

export class Step {

  public id: number;
  public description: string;
  public recipe: Recipe;

  constructor(id: number, description: string, recipe: Recipe) {
    this.id = id;
    this.description = description;
    this.recipe = recipe;
  }
}
