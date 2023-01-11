import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {User} from "../types/classes";

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  private readonly url  = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  create(user: User): Observable<User>{
    return this.httpClient.post<User>(this.url + '/register', user);
  }

  login(user: User): Observable<any>{
    return this.httpClient.post<User>(this.url + '/login', user);
  }

  list(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/viewusers');
  }

  listRegularUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/getregularusers');
  }

  delete(username: string): Observable<any>{
    return this.httpClient.delete(this.url+'/deleteuser/'+username, {responseType: 'text'});
  }

  update(user: User): Observable<any>{
    return this.httpClient.put<User>(this.url+'/updateuser', user);
  }

  getAdmin(): Observable<User> {
    return this.httpClient.get<User>(this.url+'/getadminusername');
  }
}
