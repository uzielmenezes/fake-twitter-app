import {fakeAsync, TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {ToastService} from "../../../app/services/toast/toast.service";
import {of} from "rxjs"; // Adjust the import to the correct path

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock = {navigate: jasmine.createSpy('navigate').and.returnValue(of(true))};
  let toastServiceMock = {showMessage: jasmine.createSpy('showMessage')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideRouter([]),
        {provide: Router, useValue: routerMock},
        {provide: ToastService, useValue: toastServiceMock}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if auth-token exists', fakeAsync(() => {
    spyOn(sessionStorage, 'getItem').and.returnValue('test-token');

    expect(guard.canActivate()).toBe(true);
  }));

  it('should return false, navigate to /login and show error toast if auth-token does not exist', fakeAsync(() => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    expect(guard.canActivate()).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(toastServiceMock.showMessage).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Access denied.',
      detail: `You don't have access to this page.`,
    })
  }));
});
