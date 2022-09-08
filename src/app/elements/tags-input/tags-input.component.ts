import {Component} from '@angular/core';
import {Tag} from "../../shared/objects/secondary/Tag";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

let ChooseQuantityComponent;

@Component({
  selector: 'tags-input[formControlName]',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TagsInputComponent
    }]
})
export class TagsInputComponent implements ControlValueAccessor {
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  tags: Tag[] = [];

  onChange = (tags: Tag[]) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push({ id: 0, tagName: event.value });
    }
    event.chipInput!.clear();
    this.onChange(this.tags);
  }

  remove(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.onChange(this.tags);
  }

  writeValue(tag: Tag[]) {
    this.tags = tag;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
