import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../shared/objects/Recipe";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  public favorites: Observable<Recipe[]> | undefined;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.favorites = this.userService.getFavorites();
  }

}
