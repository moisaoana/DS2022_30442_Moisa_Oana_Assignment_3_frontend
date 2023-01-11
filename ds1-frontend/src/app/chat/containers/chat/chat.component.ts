import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from "../../types/classes";
import {User} from "../../../home/types/classes";
import {TokenStorageService, UserService} from "../../../home/services";
import {MychatService} from "../../services";
import {ChatMessage, Empty, UserInChat} from "../../../../grpc/generated/chat_pb";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-chat',
  template:`
    <div class="background height full-width" fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10px">
      <mat-card class="card">
        <app-message-list
          [messages]="messages"
          class="list"
        >
        </app-message-list>
        <div class="chat-item left"
             *ngIf="isClientTyping"
        >
          <p id="body">Typing...</p>
        </div>

        <mat-icon
          *ngIf="isInputFocused"
          class="to_right"
        >done_all
        </mat-icon>

        <div class="chat-footer background-primary">
          <input matInput
                 id="chat-textarea"
                 [(ngModel)]="chatInputMessage"
                 (ngModelChange)="onKey($event)"
                 (focus)="onFocusInput($event)"
                 (blur)="onBlurInput($event)"
                 required>
          <button mat-raised-button
                  color="accent"
                  id="send-button"
                  (click)="onSend()"
                  [disabled]="chatInputMessage === ''"
                  *ngIf="user.role==='ROLE_ADMIN' || (user.role==='ROLE_USER' && firstMsg===false)"
          >send</button>
          <button mat-raised-button
                  color="accent"
                  id="send-button"
                  (click)="onStartChat()"
                  *ngIf="user.role==='ROLE_USER' && firstMsg"
          >start chat</button>
        </div>

      </mat-card>
    </div>
  `,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{
  @Input() client: string;
  @Output() newUser: EventEmitter<string> = new EventEmitter<string>()
  messages: Message[] =[]
  chatInputMessage: string = "";
  user: User;
  admin: User;
  firstMsg: boolean = true
  isClientTyping: boolean = false
  isInputFocused: boolean = false;
  @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
  private unsubscribe$ = new Subject<void>();

  constructor(private tokenStorageService: TokenStorageService,
              private myChatService: MychatService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser()
    this.userService.getAdmin().subscribe(admin => this.admin=admin);
    const userInChat = new UserInChat();
    userInChat.setUsername(this.user.username)
    this.receiveMsg(userInChat)
  }

  onStartChat(){
    this.firstMsg = false
    this.myChatService.sendMsg(this.chatInputMessage,this.admin.username,this.user.username,false,false)
  }

  onSend(){
    if(this.user.role=== "ROLE_USER") {
      const m = <Message>{
        to: this.admin.username,
        from: this.user.username,
        msg: this.chatInputMessage,
        right: true
      }
      this.messages.push(m)
      this.myChatService.sendMsg(this.chatInputMessage,this.admin.username,this.user.username,false,false)
      this.chatInputMessage = ""
      this.isInputFocused = false
    }else{
      const m = <Message>{
        to: this.client,
        from: this.user.username,
        msg: this.chatInputMessage,
        right: true
      }
      this.messages.push(m)
      this.myChatService.sendMsg(this.chatInputMessage,this.client,this.user.username,false,false)
      this.chatInputMessage = ""
      this.isInputFocused = false
    }
    //this.scrollToBottom()
  }

  sendTypingMsg(){
    if(this.user.role=== "ROLE_USER") {
      this.myChatService.sendMsg(this.chatInputMessage,this.admin.username,this.user.username,true,false)
    }else{
      this.myChatService.sendMsg(this.chatInputMessage,this.client,this.user.username,true,false)
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  receiveMsg(user: UserInChat){
    this.myChatService.receiveMsg(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(reply => {
        if(reply.getMsg() !== "") {
          if (reply.getTyping() === false && reply.getRead()===false) {
            this.displayMessage(reply)
          } else {
            if(reply.getTyping()===true){
              this.displayTyping(reply)
              if(this.messages[this.messages.length-1]?.right===true){
                if(this.user.role==="ROLE_ADMIN"){
                  if(reply.getTo() === this.user.username && reply.getFrom()===this.client){
                    this.isInputFocused = true
                  }
                }else{
                  if(reply.getTo() === this.user.username){
                    this.isInputFocused = true
                  }
                }
              }
            }
            if(reply.getRead()===true){
              if(this.messages.length!=0){
                if(this.user.role==="ROLE_ADMIN"){
                  if(reply.getTo() === this.user.username && reply.getFrom()===this.client){
                    this.isInputFocused = true
                  }
                }else{
                  if(reply.getTo() === this.user.username){
                    this.isInputFocused = true
                  }
                }
              }
            }
          }
        }else{
          this.newUser.emit(reply.getFrom())
        }
      });
  }


  displayMessage(msg: ChatMessage){
    const m = <Message>{
      to:msg.getTo(),
      from:msg.getFrom(),
      msg: msg.getMsg(),
      right: false
    }
    this.isInputFocused=false
    if(this.user.role==="ROLE_ADMIN"){
      if(msg.getTo() === this.user.username && msg.getFrom()===this.client){
        this.messages.push(m)
        //this.isInputFocused=false
      }
    }else{
      if(msg.getTo() === this.user.username){
        this.messages.push(m)
        //this.isInputFocused=false
      }
    }
  }

  displayTyping(msg: ChatMessage){
    if(this.user.role==="ROLE_ADMIN"){
      if(msg.getTo() === this.user.username && msg.getFrom()===this.client){
        this.isClientTyping = true
        setTimeout(() => {
          this.isClientTyping=false
        }, 2000);
      }
    }else{
      if(msg.getTo() === this.user.username){
        this.isClientTyping = true
        setTimeout(() => {
          this.isClientTyping=false
        }, 2000);
      }
    }

  }

  onKey(event){
      //this.isClientTyping = true
      this.sendTypingMsg()
     // setTimeout(() => {
      //  this.isClientTyping=false
     // }, 2000);


  }


  onFocusInput(event){
    if(this.user.role=== "ROLE_USER") {
      this.myChatService.sendMsg("read",this.admin.username,this.user.username,false,true)
    }else{
      this.myChatService.sendMsg("read",this.client,this.user.username,false, true)
    }
  //  this.sendReadMsg(true);
  }

  onBlurInput(event){
    console.log("blur")
  //  this.sendReadMsg(false);
  }


 // scrollToBottom() {
   // const maxScroll = this.list?.nativeElement?.scrollHeight;
   // this.list?.nativeElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
 // }

}
