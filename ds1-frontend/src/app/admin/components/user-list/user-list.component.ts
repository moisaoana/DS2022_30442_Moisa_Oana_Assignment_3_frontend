import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditUser, User} from "../../../home/types/classes";

@Component({
  selector: 'app-user-list',
  template:`
    <div fxLayout="column" fxLayoutGap="24px">
      <input [(ngModel)]="searchText"  placeholder="Search by name, username or role" class="search" >
      <app-view-user
        *ngFor="let user of users | filter: searchText"
        [user]="user"
        (edit)="editUser($event)"
        (delete)="deleteUser($event)"
      ></app-view-user>
    </div>
  `,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() users: User[];
  @Output() edit: EventEmitter<EditUser> = new EventEmitter<EditUser>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  editUser($user){
    this.edit.emit($user)
  }

  deleteUser($username){
    this.delete.emit($username)
  }


}
