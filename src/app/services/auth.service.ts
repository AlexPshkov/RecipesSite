import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {Token} from "../shared/objects/Token";
import {apiUrl} from "../app.component";
import {LoginRequest} from "../shared/requests/LoginRequest";
import {RegisterRequest} from "../shared/requests/RegisterRequest";

export const TOKEN_KEY = 'access_token'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router) {

  }

  login(loginRequest: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`${apiUrl}/auth/login`, loginRequest).pipe(
      tap(token => {
        localStorage.setItem(TOKEN_KEY, token.access_token);
      })
    )
  }

  register(registerRequest : RegisterRequest): Observable<Token> {
    return this.http.post<Token>(`${apiUrl}/auth/register`, registerRequest).pipe(
      tap(token => {
        localStorage.setItem(TOKEN_KEY, token.access_token);
      })
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['']).then(r => {})
  }

}
