import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {LoginSignService} from '../login-sign/login-sign.service';
import {Router} from '@angular/router';
import {ToastService} from '../toast/toast.service';
import {LoginResponse} from '../../types/login.types';
import {of, throwError} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let loginSignService: LoginSignService;
  let toastService: ToastService;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showMessage']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        LoginSignService,
        provideHttpClientTesting(),
        {provide: Router, useValue: routerSpy},
        {provide: ToastService, useValue: toastServiceSpy}
      ]
    });

    service = TestBed.inject(AuthService);
    loginSignService = TestBed.inject(LoginSignService);
    toastService = TestBed.inject(ToastService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate and show success message on successful login', () => {
    const mockLoginResponse: LoginResponse = {accessToken: 'fake-token', username: 'fake-user', expiresIn: 10000};
    spyOn(loginSignService, 'login').and.returnValue(of(mockLoginResponse));

    service.handleAuth('test@example.com', 'password').subscribe();

    expect(loginSignService.login).toHaveBeenCalledWith({email: 'test@example.com', password: 'password'});
    expect(router.navigate).toHaveBeenCalledWith(['/user']);
    expect(toastService.showMessage).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Login',
      detail: `User fake-user has been logged in.`
    });
  });

  it('should show error message on login failure', () => {
    const mockError = {status: 401, statusText: 'Unauthorized'};
    spyOn(loginSignService, 'login').and.returnValue(throwError(() => mockError));

    service.handleAuth('test@example.com', 'password').subscribe();

    expect(loginSignService.login).toHaveBeenCalledWith({email: 'test@example.com', password: 'password'});
    expect(toastService.showMessage).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Login',
      detail: 'Email or password is incorrect.'
    });
  });
});
