import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ingredient} from "../../shared/objects/secondary/Ingredient";

@Component({
  selector: 'ingredient-edit-block[number][ingredient]',
  templateUrl: './ingredient-edit-block.component.html',
  styleUrls: ['./ingredient-edit-block.component.scss']
})
export class IngredientEditBlockComponent {

  @Input()
  number: number = 0;

  @Input()
  public ingredient!: Ingredient;

  @Output()
  blockRemove = new EventEmitter<number>();

  constructor() { }

  removeBlock() {
    this.blockRemove.emit(this.number);
  }

}
