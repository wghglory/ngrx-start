import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

/* ngrx store */
import { Store, select } from '@ngrx/store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(
    private store: Store<any>,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    // TODO: Unsubscribe
    this.store.pipe(select('users')).subscribe((res) => {
      if (res) {
        this.maskUserName = res.maskUserName;
      }
    });
  }

  cancel() {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean) {
    // this.maskUserName = value;

    this.store.dispatch({
      type: 'MASK_USER_NAME',
      payload: value,
    });
  }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
