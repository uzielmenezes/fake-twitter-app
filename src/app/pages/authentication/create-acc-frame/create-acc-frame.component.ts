import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { passwordMatchingValidator } from '../../../../shared/validators/passwordMatchingValidator';
import { DefaultInputComponent } from '../../../components/default-input/default-input.component';
import { SignLayoutComponent } from '../../../components/sign-layout/sign-layout.component';
import { SignupForm } from '../../../types/form.types';

@Component({
  selector: 'create-acc-frame',
  standalone: true,
  imports: [SignLayoutComponent, ReactiveFormsModule, DefaultInputComponent],
  templateUrl: './create-acc-frame.component.html',
  styleUrl: './../authentication.component.scss',
})
export class CreateAccFrameComponent implements OnInit {
  formTitle: string = 'Create Your Account';
  mainTitle: string = 'Where Your Experience Starts';
  pBtnText: string = 'Create Account';
  sBtnText: string = 'Sign in';

  nameInputType: string = 'name';
  nameInputLabel: string = 'Name';
  nameInputHolder: string = 'John Doe';

  emailInputType: string = 'email';
  emailInputLabel: string = 'Email';
  emailInputHolder: string = 'johndoe@gmail.com';

  passInputName: string = 'password';
  passConfirmInputName: string = 'passwordConfirm';
  passInputType: string = 'password';
  passInputLabel: string = 'Password';
  passConfirmInputLabel: string = 'Confirm your password';

  createForm!: FormGroup<SignupForm>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group(
      {
        name: ['', [Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required]],
      },
      { validators: passwordMatchingValidator }
    );
  }

  submit() {
    console.log(this.createForm.valid);
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
