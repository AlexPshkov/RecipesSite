import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/objects/User";
import {apiUrl} from "../app.component";
import {AuthService} from "./auth.service";
import {Recipe} from "../shared/objects/Recipe";

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


  getUserData(login: string = ""): Observable<User> {
    return this.http.get<User>(`${apiUrl}/user/${login}`);
  }

  getFavorites(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(`${apiUrl}/user/favorites`);
  }
}
