import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {LoginResponse} from "../../types/login.types";
import {LoginRequest, SignupRequest} from "../../types/form.types";

const AUTH_URL = 'http://localhost:8080/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginSignService {

  private readonly http = inject(HttpClient);


  login(formValue: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AUTH_URL + '/login', formValue).pipe(tap((value) => {
      sessionStorage.setItem('auth-token', value.accessToken);
      sessionStorage.setItem('username', value.username);
    }))
  }

  create(formValue: SignupRequest): Observable<void> {
    return this.http.post<void>(AUTH_URL + '/create', formValue)
  }

  createAndLogin(formValue: SignupRequest): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {
      email: formValue.email,
      password: formValue.password,
    };
    
    return this.create(formValue).pipe(switchMap(() => this.login(loginRequest)), tap((value) => {
      sessionStorage.setItem('auth-token', value.accessToken);
      sessionStorage.setItem('username', value.accessToken);
    }));
  }
}
