import {Tag} from "./secondary/Tag";
import {Like} from "./secondary/Like";
import {Favorite} from "./secondary/Favorite";
import {User} from "./User";
import {Ingredient} from "./secondary/Ingredient";
import {Step} from "./secondary/Step";

export interface Recipe {
  id: number;
  recipeName: string;
  recipeDescription: string;
  imageURL: string;
  requiredTime: string;
  servingsAmount: string;
  user: User;
  favorites: Array<Favorite>;
  likes: Array<Like>;
  tags: Array<Tag>;
  ingredients: Array<Ingredient>;
  steps: Array<Step>;
}
