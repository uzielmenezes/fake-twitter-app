import {TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {NotFoundGuard} from './not-found.guard'; // Adjust the import to the correct path

describe('NotFoundGuard', () => {
  let guard: NotFoundGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotFoundGuard,
        provideRouter([])
      ]
    });
    guard = TestBed.inject(NotFoundGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to /user if auth-token exists', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('test-token');
    const navigateSpy = spyOn(router, 'navigate');

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/user']);
  });

  it('should allow access if auth-token does not exist', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should log "Access denied" if auth-token does not exist', () => {
    spyOn(console, 'log');
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    guard.canActivate();

    expect(console.log).toHaveBeenCalledWith('Access denied');
  });
});
