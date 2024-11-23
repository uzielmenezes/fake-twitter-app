import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { passwordMatchingValidator } from '../../../../shared/validators/passwordMatchingValidator';
import { DefaultInputComponent } from '../../../components/default-input/default-input.component';
import { SignLayoutComponent } from '../../../components/sign-layout/sign-layout.component';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginSignService } from '../../../services/login-sign/login-sign.service';
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

  nameInputName: string = 'username';
  nameInputType: string = 'name';
  nameInputLabel: string = 'Name';
  nameInputHolder: string = 'John Doe';

  emailInputType: string = 'email';
  emailInputLabel: string = 'Email';
  emailInputHolder: string = 'johndoe@gmail.com';

  passConfirmInputName: string = 'passwordConfirm';
  passInputType: string = 'password';
  passInputLabel: string = 'Password';
  passConfirmInputLabel: string = 'Confirm your password';

  tooltipMessage: string = 'Fill out the fields correctly';

  createForm!: FormGroup<SignupForm>;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly loginSignService = inject(LoginSignService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.createForm = this.fb.group(
      {
        username: ['', [Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required]],
      },
      { validators: passwordMatchingValidator }
    );
  }

  submit() {
    const { username, email, password } = this.createForm.value;

    this.loginSignService
      .createAndLogin({
        username,
        email,
        password,
      })
      .pipe(switchMap(() => this.authService.handleAuth(email, password)))
      .subscribe();
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
