import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';

/* ngrx store */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';

const userRoutes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),

    /* ngrx store for feature */
    StoreModule.forFeature('users', reducer),
  ],
  declarations: [LoginComponent],
})
export class UserModule {}
