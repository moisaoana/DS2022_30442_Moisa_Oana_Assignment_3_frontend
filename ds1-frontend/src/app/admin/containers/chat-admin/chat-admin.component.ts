import {Component, OnDestroy, OnInit} from '@angular/core';
import {MychatService} from "../../../chat/services";
import {Empty, UserInChat} from "../../../../grpc/generated/chat_pb";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../../home/services";
import {User} from "../../../home/types/classes";

@Component({
  selector: 'app-chat-admin',
  template:`
    <div fxLayout="column" >
      <app-chat-admin-view
        *ngFor="let client of clientsInChat"
        [client]="client"
        (newUser)="display($event)"
      ></app-chat-admin-view>
      </div>
  `,
  styleUrls: ['./chat-admin.component.scss']
})
export class ChatAdminComponent implements OnInit, OnDestroy {

  clientsInChat: string[] = []
  admin: User;
  private unsubscribe$ = new Subject<void>();

  constructor(private myChatService: MychatService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdmin().subscribe(admin =>{
      this.admin=admin;
      this.clientsInChat.push(this.admin.username)
     // const userInChat = new UserInChat();
     // userInChat.setUsername(this.admin.username)
     // this.receiveMsg(userInChat)
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  receiveMsg(user: UserInChat){
    this.myChatService.receiveMsg(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(reply => {
        let clientExists = false
        for(let i=0; i<this.clientsInChat.length;i++){
          if(this.clientsInChat[i]===reply.getFrom()){
            clientExists = true
          }
        }
        if(!clientExists && reply.getFrom() !== this.admin.username) {
          this.clientsInChat.push(reply.getFrom())
        }
      });
  }

  display(user){
    let clientExists = false
    for(let i=0; i<this.clientsInChat.length;i++){
      if(this.clientsInChat[i]===user){
        clientExists = true
      }
    }
    if(!clientExists && user !== this.admin.username) {
      this.clientsInChat.push(user)
    }
  }
}
