import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting,} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {LoginResponse} from '../../types/login.types';
import {LoginSignService} from './login-sign.service';

describe('LoginSignService', () => {
  let service: LoginSignService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginSignService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(LoginSignService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store auth token and username in session storage on login', () => {
    const mockResponse: LoginResponse = {
      accessToken: 'fake-token',
      username: 'fake-user',
      expiresIn: 10000,
    };
    const formValue = {
      email: 'test@example.com',
      password: 'password',
    };

    service.login(formValue).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(sessionStorage.getItem('auth-token')).toBe(
        mockResponse.accessToken
      );
      expect(sessionStorage.getItem('username')).toBe(mockResponse.username);
    });

    const req = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formValue);
    req.flush(mockResponse);
  });

  it('should create an account', () => {
    const mockSignupRequest = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'newpassword',
    };
    service.create(mockSignupRequest).subscribe(() => {
      expect().nothing();
    });
    const createReq = httpMock.expectOne('http://localhost:8080/auth/create');
    expect(createReq.request.method).toBe('POST');
    expect(createReq.request.body).toEqual(mockSignupRequest);
    createReq.flush({});
  });

  it('should create an account and log in', () => {
    const mockSignupRequest = {
      username: 'mewuser',
      email: 'newuser@example.com',
      password: 'newpassword',
    };
    const mockLoginResponse: LoginResponse = {
      accessToken: 'new-fake-token',
      username: 'new-fake-user',
      expiresIn: 10000,
    };
    service.createAndLogin(mockSignupRequest).subscribe((response) => {
      expect(response).toEqual(mockLoginResponse);
      expect(sessionStorage.getItem('auth-token')).toBe(
        mockLoginResponse.accessToken
      );
      expect(sessionStorage.getItem('username')).toBe(
        mockLoginResponse.username
      );
    });
    const createReq = httpMock.expectOne('http://localhost:8080/auth/create');
    expect(createReq.request.method).toBe('POST');
    expect(createReq.request.body).toEqual(mockSignupRequest);
    createReq.flush({});
    const loginReq = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(loginReq.request.method).toBe('POST');
    expect(loginReq.request.body).toEqual({
      email: mockSignupRequest.email,
      password: mockSignupRequest.password,
    });
    loginReq.flush(mockLoginResponse);
  });
});
