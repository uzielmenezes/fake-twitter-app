import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {ToastService} from '../../../app/services/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class NotFoundGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  canActivate(): boolean {
    const authToken = sessionStorage.getItem('auth-token');

    this.toastService.showMessage({
      severity: 'error',
      summary: 'Page Not Found',
      detail: `The page you are trying to access doesn't exist.`,
    });

    if (authToken) {
      this.router.navigate(['/fake-twitter']);
      return false;
    }

    return true;
  }
}
