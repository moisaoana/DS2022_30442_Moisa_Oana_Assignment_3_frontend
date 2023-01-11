import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../types/classes";
import {UserService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  template:  `
    <form
      [formGroup]="form"
      fxLayout="column"
      fxLayoutAlign="center center"
      fxLayoutGap="30"
    >
      <mat-form-field appearance="fill" color="accent">
        <mat-label> {{ 'Name' }} </mat-label>
        <input matInput [formControl]="nameControl"/>
      </mat-form-field>
      <mat-form-field appearance="fill" color="accent">
        <mat-label> {{ 'Username' }} </mat-label>
        <input matInput [formControl]="usernameControl"/>
      </mat-form-field>
      <mat-form-field appearance="fill" color="accent">
        <mat-label> {{ 'Password' }} </mat-label>
        <input matInput type="password" [formControl]="passwordControl"/>
      </mat-form-field>
      <mat-form-field appearance="fill" color="accent">
        <mat-label>Type</mat-label>
        <mat-select [formControl]="roleControl">
          <mat-option [value]="'ROLE_USER'">
            User
          </mat-option>
          <mat-option [value]="'ROLE_ADMIN'">
            Admin
          </mat-option>
        </mat-select>
      </mat-form-field>
      <button (click)="onSubmit()" mat-raised-button color="accent">
       Register
      </button>
      <mat-error>{{error}}</mat-error>

    </form>
  ` ,
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get roleControl(): FormControl {
    return this.form.get('type') as FormControl;
  }

  get formFields(): User {
    return <User>{
      name: this.nameControl.value,
      username: this.usernameControl.value,
      password: this.passwordControl.value,
      role: this.roleControl.value
    };
  }

  createUser(user: User): void {
    this.userService.create(user).subscribe(user => {
      this.form.reset();
      if(this.router.url === "/register") {
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    }, error => {
      this.error= error.error;
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

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

}
