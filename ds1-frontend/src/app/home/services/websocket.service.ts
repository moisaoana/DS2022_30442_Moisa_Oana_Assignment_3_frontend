import { Injectable } from '@angular/core';

const SockJs = require("sockjs-client");
const Stomp = require("stompjs");

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  connect() {
    let socket = new SockJs('http://localhost:8080/ws');
    // let socket = new SockJs(`http://localhost:8081/ws`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
