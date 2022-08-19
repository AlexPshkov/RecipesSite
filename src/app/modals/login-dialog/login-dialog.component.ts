import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    login: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-z]+")
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(
    public userService: UserService,
    public router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.userService.authService.login(this.form.value).subscribe(() => {
      this.userService.updateProfile();
      this.dialogRef.close();
    });
  }

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialog.open(RegisterDialogComponent);
  }
}
