import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {ToastService} from "../toast/toast.service";
import {LoginSignService} from "../login-sign/login-sign.service";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly loginSignService = inject(LoginSignService);

  handleAuth(email: string, password: string) {
    return this.loginSignService.login({email, password}).pipe(tap(({username}) => {
      this.router.navigate(['/user']).then(() => {
        this.toastService.showMessage({
          severity: 'success',
          summary: 'Login',
          detail: `User ${username} has been logged in.`,
        });
      });
    }), catchError((err) => {
      this.toastService.showMessage({
        severity: 'error',
        summary: 'Login',
        detail: `Email or password is incorrect.`,
      });
      console.error(err);
      return of([]);
    }));
  }
}
