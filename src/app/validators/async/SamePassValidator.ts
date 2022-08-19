// import {Injectable} from "@angular/core";
// import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
// import {Observable, of} from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SamePassValidator implements AsyncValidator {
//   constructor() {}
//
//   validate(control: AbstractControl): Observable<ValidationErrors | null> {
//     return this.heroesService.isAlterEgoTaken(control.value).pipe(
//       map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
//       catchError(() => of(null))
//     );
//   }
// }
