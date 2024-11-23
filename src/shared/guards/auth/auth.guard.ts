import {CanActivate, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {ToastService} from "../../../app/services/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  canActivate(): boolean {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      return true;
    } else {
      this.toastService.showMessage({
        severity: 'error',
        summary: 'Access denied.',
        detail: `You don't have access to this page.`,
      })
      this.router.navigate(['/login']).then(() => true);
      return false;
    }
  }
}
