import { NgModule } from '@angular/core';
import { SharedModule} from "../shared/shared.module";
import { HomeRoutingModule } from './home-routing.module';
import {ReactiveFormsModule} from "@angular/forms";

import * as containers from './containers';
import * as components from './components';
import * as services from './services';
import * as repositories from "./repositories";

@NgModule({
  declarations: [...containers.containers, ...components.components],
  imports: [
    SharedModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  providers: [...services.services,...repositories.repositories]
})
export class HomeModule { }
