import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditUser, User} from 'src/app/home/types/classes';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../home/services";

@Component({
  selector: 'app-view-user',
  template:`
    <mat-accordion >
      <mat-expansion-panel hideToggle class="pannel">
        <mat-expansion-panel-header>
          <mat-panel-title class="primary-color">
           {{user.name}}
          </mat-panel-title>
          <mat-panel-description>
           {{user.username}}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <form
          [formGroup]="form"
          fxLayout="column"
          fxLayoutAlign="center center"
          fxLayoutGap="10"
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
          <mat-error>{{error}}</mat-error>
          <div fxLayout="row" fxLayoutAlign="center" fxLayoutGap="10px">
          <button mat-raised-button color="accent" (click)="onClick()">{{buttonName}}</button>
          <button mat-raised-button
                  color="accent"
                  (click)="onDelete()"
                  *ngIf="user.username !== tokenService.getUser().username"
          >Delete</button>
          </div>
          <div *ngIf="user.role==='ROLE_USER'">
          {{user.name}}'s devices:
          <ul>
            <li *ngFor="let device of user.devices" class="primary-color">{{device.name}}</li>
          </ul>
          </div>
        </form>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  @Input() user: User;
  @Output() edit: EventEmitter<EditUser> = new EventEmitter<EditUser>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;
  buttonName: string = 'Edit';
  error: string;

  constructor(private formBuilder: FormBuilder,
              public tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.initForm();
    this.form.disable();
  }
  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }


  get roleControl(): FormControl {
    return this.form.get('type') as FormControl;
  }

  onClick(): void {
    if(this.buttonName==='Edit') {
      this.form.enable();
      this.buttonName = 'Save';
    }else{
      const newUser = <User>{
        id: this.user.id,
        name: this.nameControl.value,
        username: this.usernameControl.value,
        role: this.roleControl.value
      };
      const editUser = <EditUser>{
        user: newUser,
        prevUsername: this.user.username
      }
      this.edit.emit(editUser);
      this.form.disable();
      this.buttonName = 'Edit';
    }
  }

  onDelete(): void {
    this.delete.emit(this.user.username)
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      username: [this.user.username, Validators.required],
      type: [this.user.role, Validators.required],
    });
  }
}
