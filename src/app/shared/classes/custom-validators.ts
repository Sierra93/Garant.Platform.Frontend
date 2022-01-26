import { AbstractControl, ValidationErrors} from "@angular/forms";

export function sumValidator(control: AbstractControl): ValidationErrors | null {
  const sumRegex = /^\d+$/;
  const value = control.value;
  const result = sumRegex.test(value);
  if (!result) {
    return {sumValidator: {value}}
  }
  
  return null
}


