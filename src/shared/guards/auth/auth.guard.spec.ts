import {TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {AuthGuard} from './auth.guard'; // Adjust the import to the correct path

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideRouter([])
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if auth-token exists', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('test-token');

    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should navigate to /login if auth-token does not exist', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
