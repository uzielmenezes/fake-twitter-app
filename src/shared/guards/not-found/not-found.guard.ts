import {CanActivate, GuardResult, MaybeAsync, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NotFoundGuard implements CanActivate {
  router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    const authToken = sessionStorage.getItem("auth-token")
    
    if (authToken) {
      this.router.navigate(['/user']).then(() => true);
      return false;
    } else {
      console.log('Access denied');
      return true;
    }
  }

}
