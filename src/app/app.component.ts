import { Component } from '@angular/core';
import {routes} from "./app.module";
import {Router, Routes} from "@angular/router";
import {RegisterDialogComponent} from "./modals/register-dialog/register-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "./services/user.service";

/**
 * Api url. (Backend IP)
 */
export const apiUrl: string = "http://localhost:4200/api"
export const imagesUrl: string = "http://localhost:4200/images/"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public availablePages: Routes = routes.slice(0, 3);


  constructor(
    public router: Router,
    public dialog: MatDialog,
    public userService: UserService) {
  }

  joinButton() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      data: {}
    });
  }

  logoutButton() {
    this.userService.authService.logout();
    this.userService.updateProfile();
  }

  profileButton() {
    if (!this.userService.isAuthed) this.joinButton();
    this.router.navigate(['profile']);
  }


  /**
   * Check if this is current page
   * @param path
   */
  isCurrentPage(path: string | undefined): boolean {
    if (path == null) return false;
    return this.router.url.includes(path);
  }
}
