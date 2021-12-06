import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {UserInfo} from '../../models/user.model';
import {Router} from '@angular/router';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userInfo: UserInfo;
  pending = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private snackbar: SnackbarService) {

    this.loginForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  get username(): AbstractControl { return this.loginForm.get('username'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

  loginUser(): void {
    this.pending = true;
    this.authService.login(this.username.value, this.password.value).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        this.authService.token.next(data.token);
      },
      () => {
        this.snackbar.error('Incorrect credentials, please verify your username and password.', 'Close');
      },
      () => {
        this.pending = false;
        this.getCurrentUser();
      }
    );
  }

  getCurrentUser(): void {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data;
        localStorage.setItem('user', JSON.stringify(this.userInfo));
        this.authService.user.next(this.userInfo);
      },
      () => {
        this.snackbar.error('Could not retrieve User Information.', 'Close');
        this.authService.logout();
      },
      () => {
        this.snackbar.success(`Welcome, ${this.userInfo.name}!`, 'Close');
        this.router.navigate(['/myrecipes']);
      }
    );
  }

  goTo(url: string): void {
    this.router.navigate([url]);
  }
}
