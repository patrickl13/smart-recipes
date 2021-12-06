import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from '../models/user.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserInfo>(null);
  token = new BehaviorSubject<string>(null);
  private tokenExpiry: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  login(email: string, password: string): any {
    return this.http.post<any>('/backend/api/user/token/', {email, password});
  }

  getUserInfo(): any {
    return this.http.get<UserInfo>('/backend/api/user/me/');
  }

  autoGetUser(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userInfo = JSON.parse(user);
    this.user.next(userInfo);
  }

  autoGetToken(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.token.next(token);
  }

  autoLogin(): void {
    this.autoGetUser();
    this.autoGetToken();
  }

  autoLogout(expiration: number): void {
    this.tokenExpiry = setTimeout(() => {
      this.logout();
    }, expiration);
  }

  logout(): void {
    this.user.next(null);
    this.token.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
    if (this.tokenExpiry) {
      clearTimeout(this.tokenExpiry);
    }
    this.tokenExpiry = null;
  }
}
