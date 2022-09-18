import {Component, EventEmitter, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Tag} from "../../shared/objects/secondary/Tag";

@Component({
  selector: 'search-form',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SearchComponent
    }]
})
export class SearchComponent implements ControlValueAccessor {
  searchString: string = "";

  public tags: Tag[] = [
    {id: 0, tagName: "Мясо"},
    {id: 0, tagName: "Деликатесы"},
    {id: 0, tagName: "Пироги"},
    {id: 0, tagName: "Рыба"}
  ];

  onChange = (searchString: string) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;


  @Output()
  public searchEvent = new EventEmitter<string>();

  @Output()
  public textChange = new EventEmitter<string>();

  constructor() {
  }

  public onSubmit(value: string) {
    this.searchEvent.emit(value);
    this.onChange(value);
  }

  public onValueChange(value: string) {
    this.textChange.emit(value);
    this.onChange(value);
  }

  writeValue(searchString: string) {
    this.searchString = searchString;
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

