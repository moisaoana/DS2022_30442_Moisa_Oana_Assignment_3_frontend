import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './containers';
import {SharedModule} from "../shared/shared.module";
import { MessageListComponent } from './components';
import { ViewMessageComponent } from './components';


@NgModule({
    declarations: [
        ChatComponent,
        MessageListComponent,
        ViewMessageComponent,
    ],
    exports: [
        ChatComponent
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        SharedModule
    ]
})
export class ChatModule { }
