import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function checkTheSamePassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden =  control.parent?.value.password != control.value
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}


