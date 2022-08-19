import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../../modals/register-dialog/register-dialog.component";
import {AddRecipeWarnDialogComponent} from "../../modals/add-recipe-warn-dialog/add-recipe-warn-dialog.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      data: {}
    });
  }

  addRecipe() {
    const dialogRef = this.dialog.open(AddRecipeWarnDialogComponent, {
      data: {}
    });
  }

  ngOnInit(): void {
  }

}
