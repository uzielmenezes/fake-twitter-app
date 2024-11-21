import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {ButtonModule} from 'primeng/button';

import {DefaultInputComponent} from '../../../components/default-input/default-input.component';
import {SignLayoutComponent} from '../../../components/sign-layout/sign-layout.component';
import {LoginForm} from '../../../types/form.types';
import {LoginSignService} from "../../../services/login-sign/login-sign.service";
import {tap} from "rxjs";

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
  private readonly loginService = inject(LoginSignService)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    console.log('clickado')
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(tap(() => {
      console.log('logged in');
      this.router.navigate(['/user']).then(() => true);
      // TODO additional logic + error toasts
    })).subscribe();
  }

  navigate() {
    this.router.navigate(['/create']).then(() => true);
  }
}
