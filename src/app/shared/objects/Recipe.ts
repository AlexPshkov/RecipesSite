import {Tag} from "./secondary/Tag";
import {Like} from "./secondary/Like";
import {Favorite} from "./secondary/Favorite";
import {User} from "./User";

export class Recipe {

  public id: number;
  public recipeName: string;
  public recipeDescription: string;

  public imageURL: string;


  public requiredTime: string;
  public servingsAmount: string;

  public author: Array<User>;
  public favorites: Array<Favorite>;
  public likes: Array<Like>;
  public tags: Array<Tag>;

  constructor(id: number, recipeName: string, recipeDescription: string, imageURL: string, requiredTime: string, servingsAmount: string, author: Array<User>, favorites: Array<Favorite>, likes: Array<Like>, tags: Array<Tag>) {
    this.id = id;
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.imageURL = imageURL;
    this.requiredTime = requiredTime;
    this.servingsAmount = servingsAmount;
    this.author = author;
    this.favorites = favorites;
    this.likes = likes;
    this.tags = tags;
  }
}
