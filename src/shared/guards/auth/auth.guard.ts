import {CanActivate, GuardResult, MaybeAsync, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/login']).then(() => true);
      return false;
    }
  }
}
