import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../services";

@Component({
  selector: 'app-register',
  template:  `
    <div class="background full-height">
      <div fxFlex fxLayout="column" fxLayoutAlign="space-evenly center"  >
        <h1 class="title">Register</h1>
        <app-register-form></app-register-form>
      </div>
    </div>
	` ,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(	private router: Router,
                private route: ActivatedRoute,
                private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getUser()!=null){
      if(this.tokenStorage.getUser().role=="ROLE_USER"){
        this.router.navigate(['access-denied']);
      }
    }
  }
}
