import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Device, User} from "../../../home/types/classes";
import {DeviceService, UserService} from "../../../home/services";

@Component({
  selector: 'app-view-devices',
  template:`
    <div fxFlex fxLayout="column" fxLayoutAlign="space-evenly center">
        <h1 class="title">View devices</h1>
        <app-device-list  *ngIf="devices$ | async as devices"
                          [devices]="devices"
                          [users]="users$ | async"
                          (edit)="editDevice($event)"
                          (delete)="deleteDevice($event)"
                          fxFlex fxLayoutAlign="center center"
        >
        </app-device-list>
    </div>
  `,
  styleUrls: ['./view-devices.component.scss']
})
export class ViewDevicesComponent implements OnInit {

  devices$: Observable<Device[]>;
  users$: Observable<User[]>

  constructor(private deviceService: DeviceService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.devices$ = this.deviceService.list();
    this.users$ = this.userService.listRegularUsers();
  }

  editDevice($device){
    this.deviceService.update($device).subscribe();
  }

  deleteDevice($device){
    this.deviceService.delete($device).subscribe();
    window.location.reload();
  }

}
