import { Injectable } from '@angular/core';
import {ChatServiceClient, ResponseStream} from "../../../grpc/generated/chat_pb_service";
import {ChatMessage, Empty, ReadMessage, UserInChat} from "../../../grpc/generated/chat_pb";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MychatService {
  private client: ChatServiceClient;

  constructor() {
    this.client = new ChatServiceClient(
      'http://localhost:591');
  }

  sendMsg(msg: string, to: string, from: string, typing: boolean, read:boolean): void {
    const request = new ChatMessage();
    request.setTo(to)
    request.setFrom(from)
    request.setMsg(msg)
    request.setTyping(typing)
    request.setRead(read)
    console.log("in method")
    this.client.sendMsg(
      request, (error, response: Empty) => {
        // Your code to handle error & response.
        console.log('Error: ' + error);
        console.log('HelloResponse: ' + response);
      });
  }

  receiveMsg(user: UserInChat): Observable<ChatMessage> {
    return new Observable(obs => {
      const stream = this.client.receiveMsg(user);
      stream.on('data', (message: ChatMessage) => {
        console.log('ChatService.sendChatMessage.data', message.toObject());
        obs.next(message);
      });
    });
  }
}
