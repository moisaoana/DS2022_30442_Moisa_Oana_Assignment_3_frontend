import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../types/classes";

@Component({
  selector: 'app-view-message',
  template:`
    <div class="chat-item"
         [ngClass]="{'right' : message.right, 'left':!message.right}">
        <p id="body">{{message.msg}}</p>
    </div>
  `,
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {
  @Input() message: Message

  constructor() { }

  ngOnInit(): void {
  }

}
