import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable, throwError} from 'rxjs';
import {UserInfo} from '../models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService.token.subscribe(
      (data) =>  {
        this.token = data;
      }
    );

    if (this.token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Token ' + this.token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
