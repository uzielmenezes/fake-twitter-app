import {FormControl} from '@angular/forms';

export type LoginForm = {
  email: FormControl;
  password: FormControl;
};

export type SignupForm = {
  username: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
};

export type LoginRequest = {
  email: string;
  password: string;
}

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
}


