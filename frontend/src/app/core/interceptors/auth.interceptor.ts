import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configLocal } from '../../../config/config.local';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = configLocal.jwtToken;

    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    return next.handle(req);
  }
}
