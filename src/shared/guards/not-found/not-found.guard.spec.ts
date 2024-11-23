import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {NotFoundGuard} from './not-found.guard';
import {ToastService} from "../../../app/services/toast/toast.service";
import {of} from "rxjs";

describe('NotFoundGuard', () => {
  let guard: NotFoundGuard;
  let routerMock = {navigate: jasmine.createSpy('navigate').and.returnValue(of(true))};
  let toastServiceMock = {showMessage: jasmine.createSpy('showMessage')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotFoundGuard,
        {provide: Router, useValue: routerMock},
        {provide: ToastService, useValue: toastServiceMock}
      ]
    });
    guard = TestBed.inject(NotFoundGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if no auth token', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    expect(guard.canActivate()).toBe(true);
    expect(toastServiceMock.showMessage).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Page Not Found',
      detail: `The page you are trying to access doesn't exist.`,
    });
  });

  it('should return false, navigate to /user and show error toast if auth token is present', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('dummy-token');

    expect(guard.canActivate()).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/user']);
    expect(toastServiceMock.showMessage).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Page Not Found',
      detail: `The page you are trying to access doesn't exist.`,
    });
  });
});
