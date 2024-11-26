import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {LoginSignService} from '../login-sign/login-sign.service';
import {ToastService} from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly loginSignService = inject(LoginSignService);

  handleAuth(email: string, password: string) {
    return this.loginSignService.login({email, password}).pipe(
      tap(({username}) => {
        this.toastService.showMessage({
          severity: 'success',
          summary: 'Login',
          detail: `User ${username} has been logged in.`,
        });
        this.router.navigate(['/fake-twitter']);
      }),
      catchError((err) => {
        this.toastService.showMessage({
          severity: 'error',
          summary: 'Login',
          detail: `Email or password is incorrect.`,
        });
        console.error(err);
        return of([]);
      })
    );
  }
}
