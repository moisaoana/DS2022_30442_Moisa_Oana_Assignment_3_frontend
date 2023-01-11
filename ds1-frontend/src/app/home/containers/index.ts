import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";

export const containers = [
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  AccessDeniedComponent
];

export * from './home/home.component';
export * from './login/login.component';
export * from './register/register.component';
export * from './access-denied/access-denied.component';
