import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";

@Component({
  selector: 'app-add-recipe-warn-dialog',
  templateUrl: './add-recipe-warn-dialog.component.html',
  styleUrls: ['./add-recipe-warn-dialog.component.scss']
})
export class AddRecipeWarnDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialog.open(RegisterDialogComponent);
  }

  openLoginDialog() {
    this.dialogRef.close();
    this.dialog.open(LoginDialogComponent);
  }

}
