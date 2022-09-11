import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/objects/User";
import {apiUrl} from "../app.component";
import {AuthService} from "./auth.service";
import {Recipe} from "../shared/objects/Recipe";
import {UserStatistic} from "../shared/objects/UserStatistic";
import {ChangeUserDataRequest} from "../shared/requests/ChangeUserDataRequest";
import {Token} from "../shared/objects/Token";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isAuthed: boolean = this.authService.isAuthenticated();
  public userAccount: Observable<User> = this.getUserData();

  constructor(
    public authService: AuthService,
    private http: HttpClient) {
  }

  public updateProfile() {
    this.isAuthed = this.authService.isAuthenticated();
    this.userAccount = this.getUserData();
  }

  saveUserData( userData: ChangeUserDataRequest ): Observable<Token> {
    return this.http.post<Token>(`${apiUrl}/user`, userData);
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(`${apiUrl}/user`);
  }

  getFavorites(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${apiUrl}/user/favorites`);
  }

  getLikes(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${apiUrl}/user/likes`);
  }

  getCreatedRecipes(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${apiUrl}/user/created`);
  }

  getUserStatistic(): Observable<UserStatistic> {
    return this.http.get<UserStatistic>(`${apiUrl}/user/statistic`);
  }
}
