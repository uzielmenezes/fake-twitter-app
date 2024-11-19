import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordMatchingValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;

  return password === passwordConfirm ? null : { notmatched: true };
};
