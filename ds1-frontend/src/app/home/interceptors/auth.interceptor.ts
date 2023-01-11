import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {TokenStorageService} from "../services";
import {ActivatedRoute, Router} from "@angular/router";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService,private router: Router,
              private route: ActivatedRoute) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request;
    const token = this.token.getToken();
    if(token != null){
      authRequest =  request.clone(
        {
          headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer '+ token)
        }
      )
    }
    return next.handle(authRequest).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401 && err.status!==403) {
            return;
          }else {
            if(this.router.url==='/login' || this.router.url==='/register'){
              return;
            }
            this.router.navigate(['access-denied']);
          }
        }
      }));
  }
}
export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }
]
