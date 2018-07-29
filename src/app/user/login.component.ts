import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { takeWhile } from 'rxjs/operators';

import { AuthService } from './auth.service';

/* ngrx store */
import { Store, select } from '@ngrx/store';
import * as fromUser from './state/user.reducer';
import * as userActions from './state/user.actions';
import * as fromRoot from '../state/app.state';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Unsubscribe by takeWhile
    this.store
      .pipe(
        select(fromUser.getMaskUserName),
        takeWhile(() => this.componentActive),
      )
      .subscribe((maskUserName) => {
        this.maskUserName = maskUserName;
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  cancel() {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean) {
    // this.maskUserName = value;

    this.store.dispatch(new userActions.MaskUserName(value));
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
