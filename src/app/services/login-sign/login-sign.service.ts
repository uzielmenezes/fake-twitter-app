import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoginResponse} from "../../types/login.types";

const AUTH_URL = 'http://localhost:8080/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginSignService {

  http = inject(HttpClient);


  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AUTH_URL + '/login', {email, password}).pipe(tap((value) => {
      sessionStorage.setItem('auth-token', value.accessToken);
      sessionStorage.setItem('username', value.accessToken);
    }))
  }
}
