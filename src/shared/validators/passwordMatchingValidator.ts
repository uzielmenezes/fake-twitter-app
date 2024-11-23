import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordMatchingValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;

  if (!password || !passwordConfirm) {
    return null;
  }

  return password === passwordConfirm ? null : { notMatched: true };
};
