import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserLogin, UserSignUp} from '../../models/user.model';
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  guidance: string;
  error: boolean;
  user: UserSignUp;

  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private snackbar: SnackbarService) {

    this.registerForm = this.fb.group({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      passwordRepeat: new FormControl('')
    });
  }

  ngOnInit(): void {

  }
  get email(): AbstractControl { return this.registerForm.get('email'); }
  get username(): AbstractControl { return this.registerForm.get('username'); }
  get password(): AbstractControl { return this.registerForm.get('password'); }
  get passwordRepeat(): AbstractControl { return this.registerForm.get('passwordRepeat'); }

  registerUser(): void {

    this.user = {
      email: this.email.value,
      name: this.username.value,
      password: this.password.value
    };

    this.userService.registerUser(this.user).subscribe(
      () => {},
      () => {
        this.snackbar.error('Could not register user.', 'Close');
      },
      () => {
        this.error = false;
        this.router.navigate(['/login']);
        this.snackbar.success('User registration successful.', 'Close');
      }
    );
  }

}
