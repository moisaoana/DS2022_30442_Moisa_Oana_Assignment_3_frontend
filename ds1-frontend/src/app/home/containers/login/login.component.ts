import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template:  `
    <div class="background full-width full-height">
      <div fxFlex fxLayout="column" fxLayoutAlign="space-evenly center"  >
        <h1 class="title">Login</h1>
        <app-login-form></app-login-form>
      </div>
    </div>
	` ,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
