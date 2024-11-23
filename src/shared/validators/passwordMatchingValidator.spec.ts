import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { passwordMatchingValidator } from './passwordMatchingValidator';

fdescribe('passwordMatchingValidator', () => {
  const buildForm = (password: string, passwordConfirm: string) => {
    return new FormGroup(
      {
        password: new FormControl(password),
        passwordConfirm: new FormControl(passwordConfirm),
      },
      { validators: passwordMatchingValidator as ValidatorFn }
    );
  };

  it('should return null if passwords match', () => {
    const form = buildForm('password123', 'password123');
    expect(passwordMatchingValidator(form)).toBeNull();
  });

  it('should return { notMatched: true } if passwords do not match', () => {
    const form = buildForm('password123', 'password456');
    expect(passwordMatchingValidator(form)).toEqual({ notMatched: true });
  });

  it('should return null if one or both passwords are empty', () => {
    const formEmptyPasswords = buildForm('', '');
    expect(passwordMatchingValidator(formEmptyPasswords)).toBeNull();

    const formOneEmptyPassword = buildForm('password123', '');
    expect(passwordMatchingValidator(formOneEmptyPassword)).toBeNull();
  });
});
