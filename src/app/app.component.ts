import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {routes} from "./app.module";
import {Router, Routes} from "@angular/router";
import {RegisterDialogComponent} from "./modals/register-dialog/register-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "./services/user.service";
import {ExternalHtmlService} from "./services/external-html.service";
import {ImageUrlPipe} from "./pipes/image-url.pipe";

/**
 * Api url. (Backend IP)
 */
export const domainUrl: string = "http://localhost:4200/"
export const apiUrl: string = domainUrl + "api"
export const imagesUrl: string = domainUrl + "images/"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('siteContent')
  siteContent!: ElementRef<HTMLInputElement>;

  public availablePages: Routes = routes.slice(0, 3);

  constructor(
    private renderer: Renderer2,
    public router: Router,
    public dialog: MatDialog,
    public userService: UserService,
    public externalHtmlService : ExternalHtmlService) {
  }

  ngOnInit(): void {
    this.userService.updateProfile();
    this.loadBackground();
  }

  loadBackground() {
    this.externalHtmlService.getSvgRaw("curve").subscribe( svg => {
      let svgImageData: string = new ImageUrlPipe().transform(this.externalHtmlService.encodeSVG(svg));
      let css: CSSStyleDeclaration = window.getComputedStyle(this.siteContent.nativeElement);
      let color: string = css.getPropertyValue("color");

      svgImageData = svgImageData.replace(/currentColor/g, color);
      this.renderer.setStyle(this.siteContent.nativeElement, "background-image", svgImageData);
    } );
  }

  joinButton() {
    this.dialog.open(RegisterDialogComponent, {
      data: {}
    });
  }

  logoutButton() {
    this.userService.authService.logout();
    this.userService.updateProfile();
  }

  profileButton() {
    if (!this.userService.isAuthed) {
      this.joinButton();
      return;
    }
    this.router.navigate(['profile']);
  }

  isCurrentPage(path: string | undefined): boolean {
    if (path == null) return false;
    return this.router.url.includes(path);
  }
}
