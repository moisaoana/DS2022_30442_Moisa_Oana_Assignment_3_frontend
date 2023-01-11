import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  template:  `
    <div class="background full-height full-width">
      <div fxFlex fxLayout="column" fxLayoutAlign="space-evenly center"  >
        <h1 class="title">Energy Utility Platform</h1>
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="20px" >
          <button mat-raised-button color="accent" (click)="onRegister()">Register</button>
          <button mat-raised-button color="accent" (click)="onLogin()">Login</button>
        </div>
      </div>
    </div>
	` ,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(	private router: Router,
                private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
  }

  onLogin(){
    this.router.navigate(['login'], { relativeTo: this.route });
  }

  onRegister(){
    this.router.navigate(['register'], { relativeTo: this.route });
  }

}
