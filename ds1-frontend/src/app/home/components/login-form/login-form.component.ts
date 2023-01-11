import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService, UserService} from "../../services";
import {User} from "../../types/classes";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  template:  `
    <form
      [formGroup]="form"
      fxLayout="column"
      fxLayoutAlign="center center"
      fxLayoutGap="30"
    >
      <mat-form-field appearance="fill" color="accent">
        <mat-label> {{ 'Username' }} </mat-label>
        <input matInput [formControl]="usernameControl"/>
      </mat-form-field>
      <mat-form-field appearance="fill" color="accent">
        <mat-label> {{ 'Password' }} </mat-label>
        <input matInput type="password" [formControl]="passwordControl"/>
      </mat-form-field>
      <button (click)="onSubmit()" mat-raised-button color="accent">
        Login
      </button>
      <mat-error>{{error}}</mat-error>
    </form>
	` ,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get formFields(): User {
    return <User>{
      username: this.usernameControl.value,
      password: this.passwordControl.value,
    };
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  createUser(user: User): void {
    this.userService.login(user).subscribe(response => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);
        this.error=null;
        this.form.reset();
        if(response.role === "ROLE_ADMIN") {
          this.router.navigate(['../admin'], {relativeTo: this.route});
        }else if(response.role === "ROLE_USER"){
          this.router.navigate(['../user'], {relativeTo: this.route});
        }

      }, error => {
        this.error= 'Incorrect username or password!';
      }
    );
  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    const user = this.formFields;
    this.createUser(user);
  }

}
