import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPlainComponent } from '../core/layout/layout-plain/layout-plain.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPlainComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { title: 'Login' } },
      { path: 'forgot', component: ForgotComponent, data: { title: 'Forgot password' } },
      { path: 'reset', component: ResetComponent, data: { title: 'Reset password' } },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRouting {}