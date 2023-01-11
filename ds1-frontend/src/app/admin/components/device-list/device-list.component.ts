import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Device, User} from 'src/app/home/types/classes';

@Component({
  selector: 'app-device-list',
  template:`
    <div fxLayout="column" fxLayoutGap="24px">
      <input [(ngModel)]="searchText"  placeholder="Search" class="search" >
      <app-view-device
        *ngFor="let device of devices | filter: searchText"
        [device]="device"
        [users]="users"
        (edit)="editDevice($event)"
        (delete)="deleteDevice($event)"
      ></app-view-device>
    </div>
  `,
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  @Input() devices: Device[];
  @Input() users: User[];
  @Output() edit: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  editDevice($device){
    this.edit.emit($device);
  }

  deleteDevice($device){
    this.delete.emit($device);
  }

}
