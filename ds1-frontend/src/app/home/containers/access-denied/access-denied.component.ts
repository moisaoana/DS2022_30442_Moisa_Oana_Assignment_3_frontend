import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template:`
    <div class="full-height full-width">
    <h1 class="warn-color warning">You don't have permission to access this page!</h1>
    </div>
  `,
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
