import {User} from "../User";
import {Recipe} from "../Recipe";

export class Favorite {

  public id: number;
  public user: User;
  public recipe: Recipe;

  constructor(id: number, user: User, recipe: Recipe) {
    this.id = id;
    this.user = user;
    this.recipe = recipe;
  }
}
