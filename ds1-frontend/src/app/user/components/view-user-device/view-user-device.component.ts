import {Component, Input, OnInit} from '@angular/core';
import { MyDate } from 'src/app/home/types/classes/mydate.class';
import {Device, Measurement} from "../../../home/types/classes";
import { Chart } from '../../types';

@Component({
  selector: 'app-view-user-device',
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
        <p><b>Address:</b> {{device.address}}</p>
        <p><b>Max hourly energy consumption:</b> {{device.maxHourlyEnergyConsumption}} kWh</p>
        <mat-form-field appearance="fill">
          <mat-label>Choose a date</mat-label>
          <input matInput [matDatepicker]="picker" [(ngModel)]="date" [max]="today">
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field><br>
        <button mat-raised-button
                color="accent"
                (click)="onViewChart()"
        >View chart</button>
        <mat-error>{{error}}</mat-error>
        <app-chart
          *ngIf="showChart"
          [list]="measurements"
        ></app-chart>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styleUrls: ['./view-user-device.component.scss']
})
export class ViewUserDeviceComponent implements OnInit {
  @Input() device: Device;
  date: string;
  showChart: boolean = false;
  measurements: Chart[] =[];
  error: string;
  today: Date;

  constructor() { }

  ngOnInit(): void {
    this.today=new Date();
    this.device.measurements.sort(
      (m1,m2) => m1.hour - m2.hour
    );
  }

  onViewChart() {
    if (!!this.date) {
      this.measurements =[];
      console.log(this.measurements)
      this.error="";
      this.showChart = true;
      let date = new Date(this.date);
      let dateDTO = <MyDate>{
        day: date.getUTCDate() + 1,
        month: date.getMonth() + 1,
        year: date.getFullYear()
      }
      console.log(dateDTO)

      for (let i =0; i <this.device.measurements.length; i++) {
        if (this.device.measurements[i].day === dateDTO.day &&
          this.device.measurements[i].month === dateDTO.month &&
          this.device.measurements[i].year === dateDTO.year
        ) {
          this.measurements.push({
            value: this.device.measurements[i].value,
            color: '#498B94', size: '', legend: this.device.measurements[i].hour.toString()
          })
        }
      }
    }else{
      this.error = 'Please select a date!'
    }
    console.log(this.measurements)
  }
}
