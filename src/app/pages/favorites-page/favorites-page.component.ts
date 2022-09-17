import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../shared/objects/Recipe";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  public favorites: Recipe[] = [];

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.userService.getFavorites().subscribe(recipes => {
      this.favorites = recipes;
    });
  }

}
