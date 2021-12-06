import { Injectable } from '@angular/core';
import {UserLogin, UserInfo} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Message} from '../models/misc.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserInfo;
  currentUser: UserInfo;
  private userSubject = new Subject<UserInfo>();
  public userEmitter = this.userSubject.asObservable();


  constructor(private http: HttpClient) { }

  registerUser(user: UserLogin): Observable<Message> {
    return this.http.post<Message>('/backend/api/user/create/', user);
  }

  userEmitChange(usr: UserInfo): void {
    this.userSubject.next(usr);
  }
}
