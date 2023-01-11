import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../home/types/classes";
import {TokenStorageService, UserService} from "../../../home/services";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-view-users',
  template: `
    <div fxFlex fxLayout="column" fxLayoutAlign="space-evenly center"  >
      <h1 class="title">View users</h1>
      <app-user-list    *ngIf="users$ | async as users"
                        [users]="users"
                        (edit)="editUser($event)"
                        (delete)="deleteUser($event)"
                        fxFlex fxLayoutAlign="center center"
      >
      </app-user-list>
    </div>
  `,
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void{
    this.users$ = this.userService.list();
  }

  editUser($user) {
    this.userService.update($user.user).subscribe();
    if (this.tokenService.getUser().username === $user.prevUsername) {
      this.tokenService.signOut();
      this.router.navigate(['../../login'], {relativeTo: this.route});
    }else{
      window.location.reload();
    }
  }

  deleteUser($username){
    this.userService.delete($username).subscribe();
    window.location.reload();
  }

}
