import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globalConfig } from '../../../config/global-config';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = globalConfig.jwtToken;
    //todo: handle error

    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      })
    }

    return next.handle(req);
  }
}