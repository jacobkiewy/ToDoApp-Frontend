import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoHelper } from '../helper/cryptoHelper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  cryptoHelper:CryptoHelper = new CryptoHelper()
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    let decodeToken:string |null = token;
    if (token) {
      decodeToken = this.cryptoHelper.decrypted(token)
    }
    let newRequest:HttpRequest<any>;
    newRequest = request.clone({
      headers: request.headers.set('Authorization','Bearer '+decodeToken)
    })
    return next.handle(newRequest);
  }
}
