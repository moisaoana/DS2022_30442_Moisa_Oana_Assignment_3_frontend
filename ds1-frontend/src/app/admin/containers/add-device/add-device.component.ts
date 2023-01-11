import { Component, OnInit } from '@angular/core';
import {DeviceService, UserService} from "../../../home/services";
import {Observable} from "rxjs";
import {User} from "../../../home/types/classes";

@Component({
  selector: 'app-add-device',
  template:`
    <div fxFlex fxLayout="column" fxLayoutAlign="space-evenly center"  >
      <h1 class="title">Add new device</h1>
      <app-add-device-form *ngIf="users$ | async as users"
                           [users]="users"
                           (device)="createDevice($event)"
      >

      </app-add-device-form>
    </div>
  `,
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {

   users$: Observable<User[]>;

  constructor(private userService: UserService,
              private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.users$ = this.userService.listRegularUsers();
  }

  createDevice($device){
    this.deviceService.create($device).subscribe(device=>{
      }, error =>{}
    )
  }
}
