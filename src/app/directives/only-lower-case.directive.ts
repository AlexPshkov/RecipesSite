import { Directive } from '@angular/core';
import {Subscription} from "rxjs";
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[onlyLowerCase]'
})
export class OnlyLowerCaseDirective {

  sub: Subscription | undefined = new Subscription();

  constructor(
    private ngControl: NgControl
  ) { }

  ngOnInit() {
    this.sub = this.ngControl.valueChanges?.subscribe(value =>
      this.ngControl.control?.setValue((value.toLowerCase() || ''), {
        emitEvent: false
      }));
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
