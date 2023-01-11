import { Injectable } from '@angular/core';
import {DeviceRepository} from "../repositories";
import {Device} from "../types/classes";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private deviceRepository: DeviceRepository) { }

  create(device: Device) : Observable<Device> {
    return this.deviceRepository.create(device);
  }

  list(): Observable<Device[]> {
    return this.deviceRepository.list();
  }

  listByUser(username: string): Observable<Device[]> {
    return this.deviceRepository.listByUser(username);
  }

  update(device: Device): Observable<any>{
    return this.deviceRepository.update(device);
  }

  delete(id: number): Observable<any> {
    return this.deviceRepository.delete(id);
  }

}
