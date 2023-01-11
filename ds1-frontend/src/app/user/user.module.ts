import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {SharedModule} from "../shared/shared.module";
import * as containers from './containers';
import { UserDevicesListComponent } from './components/user-devices-list/user-devices-list.component';
import { ViewUserDeviceComponent } from './components/view-user-device/view-user-device.component';
import { ChartComponent } from './components/chart/chart.component';
import { ViewWarningComponent } from './components/view-warning/view-warning.component';

@NgModule({
  declarations: [
    ...containers.containers,
    UserDevicesListComponent,
    ViewUserDeviceComponent,
    ChartComponent,
    ViewWarningComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
