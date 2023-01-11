import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Device, User} from 'src/app/home/types/classes';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-device',
  template:`
    <mat-accordion >
      <mat-expansion-panel hideToggle class="pannel">
        <mat-expansion-panel-header>
          <mat-panel-title class="primary-color">
            {{device.name}}
          </mat-panel-title>
          <mat-panel-description>
            {{device.description}}
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
            <mat-label> {{ 'Description' }} </mat-label>
            <textarea matInput [formControl]="descriptionControl"></textarea>
          </mat-form-field>
          <mat-form-field appearance="fill" color="accent">
            <mat-label> {{ 'Address' }} </mat-label>
            <textarea matInput [formControl]="addressControl"></textarea>
          </mat-form-field>
          <mat-form-field appearance="fill" color="accent">
            <mat-label> {{ 'Max hourly consumption' }} </mat-label>
            <input matInput [formControl]="consumptionControl"/>
          </mat-form-field>
          <mat-form-field appearance="fill" color="accent">
            <mat-label>User</mat-label>
            <mat-select [formControl]="userControl">
              <mat-option *ngFor="let user of users" [value]="user.id">
                {{user.name}}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-error>{{error}}</mat-error>
          <div fxLayout="row" fxLayoutAlign="center" fxLayoutGap="10px">
            <button mat-raised-button color="accent" (click)="onClick()">{{buttonName}}</button>
            <button mat-raised-button color="accent" (click)="onDelete()">Delete</button>
          </div>
        </form>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styleUrls: ['./view-device.component.scss']
})
export class ViewDeviceComponent implements OnInit {
  @Input() device: Device
  @Input() users: User[];
  @Output() edit: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  form: FormGroup;
  error: string;
  buttonName: string = 'Edit';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.form.disable();
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

  onClick(): void {
    if(this.buttonName==='Edit') {
      this.form.enable();
      this.buttonName = 'Save';
    }else{
      const newDevice = <Device>{
        id: this.device.id,
        name: this.nameControl.value,
        description: this.descriptionControl.value,
        address: this.addressControl.value,
        maxHourlyEnergyConsumption: this.consumptionControl.value,
        userId: this.userControl.value
      };
      this.edit.emit(newDevice);
      this.form.disable();
      this.buttonName = 'Edit';
      window.location.reload();
    }
  }

  onDelete(){
    this.delete.emit(this.device.id);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.device.name, [Validators.required]],
      description: [this.device.description, Validators.required],
      address: [this.device.address, Validators.required],
      consumption: [this.device.maxHourlyEnergyConsumption, Validators.required],
      user:[this.device.user.id, Validators.required]
    });
  }

}
