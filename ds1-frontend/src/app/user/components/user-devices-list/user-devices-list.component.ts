import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Device } from 'src/app/home/types/classes';

@Component({
  selector: 'app-user-devices-list',
  template:`
    <div fxLayout="column" fxLayoutGap="24px">
      <app-view-user-device
        *ngFor="let device of devices"
        [device]="device"
      ></app-view-user-device>
    </div>
  `,
  styleUrls: ['./user-devices-list.component.scss']
})
export class UserDevicesListComponent implements OnInit {

  @Input() devices: Device[];

  constructor() { }

  ngOnInit(): void {
  }

}
