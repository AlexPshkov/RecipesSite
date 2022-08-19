import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/objects/Recipe";

@Component({
  selector: 'recipe-block[recipeObject]',
  templateUrl: './recipe-block.component.html',
  styleUrls: ['./recipe-block.component.scss']
})
export class RecipeBlockComponent implements OnInit {
  @Input()
  public recipeObject!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
