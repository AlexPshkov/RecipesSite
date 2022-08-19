import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {checkTheSamePassword} from "../../validators/CustomValidators";


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {


  public form: FormGroup = new FormGroup({
    name: new FormControl("", [
      Validators.required
    ]),
    login: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-z]+")
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    password_repeat: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      checkTheSamePassword()
    ]),
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
    this.userService.authService.register(this.form.value).subscribe(() => {
      this.userService.updateProfile();
      this.dialogRef.close();
    });
  }


  openLoginDialog() {
    this.dialogRef.close();
    this.dialog.open(LoginDialogComponent);
  }
}
