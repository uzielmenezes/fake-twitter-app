import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { DefaultInputComponent } from '../../../components/default-input/default-input.component';
import { SignLayoutComponent } from '../../../components/sign-layout/sign-layout.component';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginForm } from '../../../types/form.types';

@Component({
  selector: 'app-login-frame',
  standalone: true,
  imports: [
    ButtonModule,
    SignLayoutComponent,
    ReactiveFormsModule,
    DefaultInputComponent,
  ],
  templateUrl: './login-frame.component.html',
  styleUrl: './../authentication.component.scss',
})
export class LoginFrameComponent implements OnInit {
  formTitle: string = 'Login Here';
  mainTitle: string = 'Fake Twitter App';
  pBtnText: string = 'Sign in';
  sBtnText: string = 'Create account';

  pInputLabel: string = 'Email';
  pInputType: string = 'email';
  pInputPlaceholder: string = 'johndoe@live.com';

  sInputLabel: string = 'Password';
  sInputType: string = 'password';

  loginForm!: FormGroup<LoginForm>;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    const { email, password } = this.loginForm.value;
    this.authService.handleAuth(email, password).subscribe();
  }

  navigate(route: string = 'create') {
    this.router.navigate(['/create']);
  }
}
