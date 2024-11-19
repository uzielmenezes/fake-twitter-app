import { FormControl } from '@angular/forms';

export type LoginForm = {
  email: FormControl;
  password: FormControl;
};

export type SignupForm = {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
};
