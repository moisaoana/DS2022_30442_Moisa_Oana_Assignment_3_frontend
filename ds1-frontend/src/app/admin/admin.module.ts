import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import * as containers from './containers';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { AddDeviceComponent } from './containers/add-device/add-device.component';
import { AddDeviceFormComponent } from './components/add-device-form/add-device-form.component';
import { ViewDevicesComponent } from './containers/view-devices/view-devices.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { ViewDeviceComponent } from './components/view-device/view-device.component';
import { ChatAdminComponent } from './containers/chat-admin/chat-admin.component';
import {ChatModule} from "../chat/chat.module";
import { ChatAdminViewComponent } from './components/chat-admin-view/chat-admin-view.component';


@NgModule({
  declarations: [...containers.containers, ViewUserComponent, UserListComponent, AddDeviceComponent, AddDeviceFormComponent, ViewDevicesComponent, DeviceListComponent, ViewDeviceComponent, ChatAdminComponent, ChatAdminViewComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
        ChatModule
    ],
  providers:[]
})
export class AdminModule { }
