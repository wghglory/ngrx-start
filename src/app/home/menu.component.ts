import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';

@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName() {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  ngOnInit() {}

  logOut() {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
