import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step} from "../../shared/objects/secondary/Step";

@Component({
  selector: 'step-edit-block[number][step]',
  templateUrl: './step-edit-block.component.html',
  styleUrls: ['./step-edit-block.component.scss']
})
export class StepEditBlockComponent {

  @Input()
  number: number = 0;

  @Input()
  public step: Step | undefined;

  @Output()
  blockRemove = new EventEmitter<number>();
  constructor() { }

  removeBlock() {
    this.blockRemove.emit(this.number);
  }

}
