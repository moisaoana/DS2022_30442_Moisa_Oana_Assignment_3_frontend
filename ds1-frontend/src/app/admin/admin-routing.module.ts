import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddDeviceComponent, AdminProfileComponent, ViewDevicesComponent, ViewUsersComponent} from "./containers";
import {RegisterComponent} from "../home/containers";
import {ChatComponent} from "../chat/containers";
import {ChatAdminComponent} from "./containers/chat-admin/chat-admin.component";

const routes: Routes = [
  {
    path: '',
    component: AdminProfileComponent,
    children: [
      {path: 'view-users', component: ViewUsersComponent},
      {path: 'add-user', component: RegisterComponent},
      {path: 'add-device', component: AddDeviceComponent},
      {path: 'view-devices', component: ViewDevicesComponent},
      {path:'chat', component: ChatAdminComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
