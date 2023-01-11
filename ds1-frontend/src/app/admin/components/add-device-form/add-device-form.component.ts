import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Device, User} from "../../../home/types/classes";

@Component({
  selector: 'app-add-device-form',
  template:`
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
        <mat-label> {{ 'Description' }} </mat-label>
        <textarea matInput [formControl]="descriptionControl"></textarea>
      </mat-form-field>
      <mat-form-field appearance="fill" color="accent">
        <mat-label> {{ 'Address' }} </mat-label>
        <textarea matInput [formControl]="addressControl"></textarea>
      </mat-form-field>
      <mat-form-field appearance="fill" color="accent">
        <mat-label> {{ 'Max hourly consumption' }} </mat-label>
        <input matInput type="number" [formControl]="consumptionControl"/>
      </mat-form-field>
      <mat-form-field appearance="fill" color="accent">
        <mat-label>User</mat-label>
        <mat-select [formControl]="userControl">
          <mat-option *ngFor="let user of users" [value]="user.id">
            {{user.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <button (click)="onSubmit()" mat-raised-button color="accent">
        Add device
      </button>
      <mat-error>{{error}}</mat-error>
    </form>
  `,
  styleUrls: ['./add-device-form.component.scss']
})
export class AddDeviceFormComponent implements OnInit {

  @Input() users: User[];
  @Output() device: EventEmitter<Device> = new EventEmitter<Device>();
  form: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get addressControl(): FormControl {
    return this.form.get('address') as FormControl;
  }

  get consumptionControl(): FormControl {
    return this.form.get('consumption') as FormControl;
  }

  get userControl(): FormControl {
    return this.form.get('user') as FormControl;
  }

  get formFields(): Device {
    return <Device>{
      name: this.nameControl.value,
      description: this.descriptionControl.value,
      address: this.addressControl.value,
      maxHourlyEnergyConsumption: this.consumptionControl.value,
      userId: this.userControl.value,
    };
  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    const newDevice= this.formFields;
    this.device.emit(newDevice);
  }


  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      consumption: ['', Validators.required],
      user:['', Validators.required]
    });
  }
}
