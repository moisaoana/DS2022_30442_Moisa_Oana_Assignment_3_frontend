import { Injectable } from '@angular/core';
import {UserRepository} from "../repositories";
import {Observable} from "rxjs";
import {User} from "../types/classes";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  create(user: User): Observable<User> {
    return this.userRepository.create(user);
  }

  login(user: User): Observable<any> {
    return this.userRepository.login(user);
  }

  delete(username: string): Observable<any> {
    return this.userRepository.delete(username);
  }

  update(user: User):Observable<any> {
    return this.userRepository.update(user);
  }

  list(): Observable<User[]> {
    return this.userRepository.list();
  }

  listRegularUsers(): Observable<User[]> {
    return this.userRepository.listRegularUsers();
  }

  getAdmin(): Observable<User>{
    return this.userRepository.getAdmin();
  }
}
