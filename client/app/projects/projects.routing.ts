import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LayoutMainComponent } from '../core/layout/layout-main/layout-main.component';

import { ClientsComponent } from './clients/clients.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';

const routes: Routes = [
  { path: 'projects', redirectTo: 'projects/projects', pathMatch: 'full' },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    component: LayoutMainComponent,
    data: { color: 'txt-accent2', icon: 'fas fa-project-diagram', nav: true, title: 'Projects' },
    children: [
      { path: 'clients', component: ClientsComponent, data: { icon: 'fal fa-building', nav: true, title: 'Clients' } },
      { path: 'projects', component: ProjectsComponent, data: { icon: 'fal fa-project-diagram', nav: true, title: 'Projects' } },
      { path: 'tasks', component: TasksComponent, data: { icon: 'fal fa-tasks', nav: true, title: 'Tasks' } },
      { path: 'timesheets', component: TimesheetsComponent, data: { icon: 'fal fa-clock', nav: true, title: 'Timesheets' } },
      { path: 'invoices', component: InvoicesComponent, data: { icon: 'fal fa-coin', nav: true, title: 'Invoices' } },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ProjectsRouting {}
