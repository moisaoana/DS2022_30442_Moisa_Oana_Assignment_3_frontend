import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from "../../../chat/types/classes";

@Component({
  selector: 'app-chat-admin-view',
  template:`
    <mat-accordion >
      <mat-expansion-panel hideToggle class="pannel">
        <mat-expansion-panel-header>
          <mat-panel-title class="primary-color">
            {{client}}
          </mat-panel-title>
        </mat-expansion-panel-header>
        <app-chat
          [client]="client"
          (newUser)="emit($event)"
        ></app-chat>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styleUrls: ['./chat-admin-view.component.scss']
})
export class ChatAdminViewComponent implements OnInit {
  @Input() client: string;
  @Output() newUser: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emit(newUser){
    this.newUser.emit(newUser)
  }

}
