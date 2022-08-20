import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackbarComponent} from "../error-snackbar/error-snackbar.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessages} from "../../utils/ErrorMessages";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(
    public userService: UserService,
    public router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.userService.authService.login(this.form.value).subscribe({
      complete: () => {
        this.userService.updateProfile();
        this.dialogRef.close();
      },
      error: err => this.handleHttpError(err)
    });
  }

  onChange() {
    this.form.updateValueAndValidity();
  }

  handleHttpError(httpError: HttpErrorResponse) {
    const errorText = ErrorMessages.getTextMessage(httpError);
    this.snack.openFromComponent(ErrorSnackbarComponent, { data: errorText });
    if (httpError.status == 401) this.form.setErrors({wrongData: errorText})
  }

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialog.open(RegisterDialogComponent);
  }
}
