import {UserService} from "./user.service";
import {TokenStorageService} from "./token-storage.service";
import {DeviceService} from "./device.service";
import {WebsocketService} from "./websocket.service";

export const services =[
  UserService,
  TokenStorageService,
  DeviceService,
  WebsocketService
]

export * from './user.service'
export * from './token-storage.service'
export * from './device.service'
export * from './websocket.service'
