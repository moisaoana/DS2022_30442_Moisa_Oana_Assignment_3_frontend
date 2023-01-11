import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../types/classes";

@Component({
  selector: 'app-message-list',
  template:`
    <app-view-message
      *ngFor="let message of messages"
      [message]="message"
    ></app-view-message>
  `,
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[]

  constructor() { }

  ngOnInit(): void {
  }

}
