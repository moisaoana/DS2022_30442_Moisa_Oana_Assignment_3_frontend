import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Device} from "../types/classes";

@Injectable({
  providedIn: 'root'
})
export class DeviceRepository {

  private readonly url  = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  create(device: Device): Observable<Device>{
    console.log(device)
    return this.httpClient.post<Device>(this.url + '/createdevice', device);
  }

  list(): Observable<Device[]>{
    return this.httpClient.get<Device[]>(this.url+'/viewdevices');
  }

  listByUser(username: string): Observable<Device[]>{
    return this.httpClient.get<Device[]>(this.url+'/viewdevicesbyuser/'+username);
  }

  update(device: Device): Observable<any>{
    return this.httpClient.put<Device>(this.url+'/updatedevice', device);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url+'/deletedevice/'+id, {responseType: 'text'});
  }

}
