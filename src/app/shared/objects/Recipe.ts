import {Tag} from "./Tag";

export class Recipe {

  public id: number;
  public recipeName: string;
  public recipeDescription: string;

  public imageURL: string;
  public authorName: string;

  public requiredTime: string;
  public servingsAmount: string;

  public favoritesAmount: string;
  public likesAmount: string;
  public currentTags: Array<Tag>;


  constructor(id: number, recipeName: string, recipeDescription: string, imageURL: string, authorName: string, requiredTime: string, servingsAmount: string, favoritesAmount: string, likesAmount: string,  currentTags: Array<Tag>) {
    this.id = id;
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.imageURL = imageURL;
    this.authorName = authorName;
    this.requiredTime = requiredTime;
    this.servingsAmount = servingsAmount;
    this.favoritesAmount = favoritesAmount;
    this.likesAmount = likesAmount;
    this.currentTags = currentTags;
  }
}
