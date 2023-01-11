import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../home/services";
import {User} from "../../../home/types/classes";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-profile',
  template:  `
    <mat-sidenav-container class = "sidenav__container">
      <mat-sidenav mode = "side" opened class="sidenav">
        <div fxLayout="column" fxLayoutAlign=" center" >
        <div>
          Welcome
        </div>
        <b>
          {{admin.name}}!
        </b>
          <i>
            admin
          </i>
        </div>
        <mat-divider></mat-divider>
        <div fxLayout="column" fxLayoutAlign="center" fxLayoutGap="24px">
          <button mat-button class="menu-button" routerLink="view-users" routerLinkActive="sidenav__button-active">
            <mat-icon>people</mat-icon>
            <span>View users</span>
          </button>
          <button mat-button class="menu-button" routerLink="add-user" routerLinkActive="sidenav__button-active">
            <mat-icon>person_add</mat-icon>
            <span>Add new user</span>
          </button>
          <button mat-button class="menu-button" routerLink="view-devices" routerLinkActive="sidenav__button-active">
            <mat-icon>smartphone</mat-icon>
            <span>View devices</span>
          </button>
          <button mat-button class="menu-button" routerLink="add-device" routerLinkActive="sidenav__button-active">
            <mat-icon>add</mat-icon>
            <span>Add new device</span>
          </button>
          <button mat-button class="menu-button" routerLink="chat" routerLinkActive="sidenav__button-active">
            <mat-icon>chat</mat-icon>
            <span>Chat</span>
          </button>
          <button mat-button class="menu-button" routerLinkActive="sidenav__button-active" routerLink="../login" (click)="onLogout()">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="sidenav__content">
        <router-outlet>
        </router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  ` ,
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  admin: User;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.admin = this.tokenStorageService.getUser()
    if(this.admin===null){
      this.router.navigate(['../access-denied'], {relativeTo: this.route});
    }else {
      this.router.navigate(['view-users'], {relativeTo: this.route});
    }
  }

  onLogout(){
    this.tokenStorageService.signOut();
  }

}
