import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { LayoutMainComponent } from '../core/layout/layout-main/layout-main.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: LayoutMainComponent,
    data: { color: 'txt-primary', icon: 'fas fa-tachometer', nav: true, title: 'Dashboard' },
    children: [
      { path: '', component: DashboardComponent, data: { icon: 'fas fa-tachometer', nav: false, title: 'Dashboard' } }
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRouting {}
