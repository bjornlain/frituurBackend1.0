import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UiModule } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { ClientsComponent } from './clients/clients.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ProjectsRouting } from './projects.routing';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { HoursComponent } from './timesheets/overview/hours/hours.component';
import { OvertimeComponent } from './timesheets/overview/overtime/overtime.component';
import { OverviewComponent } from './timesheets/overview/overview.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { WorkListComponent } from './timesheets/work/work-list/work-list.component';
import { WorkDetailComponent } from './timesheets/work/work-detail/work-detail.component';

@NgModule({
  declarations: [
    ClientsComponent,
    HoursComponent,
    InvoicesComponent,
    ProjectsComponent,
    OverviewComponent,
    OvertimeComponent,
    TasksComponent,
    TimesheetsComponent,
    WorkListComponent,
    WorkDetailComponent,
  ],
  imports: [AuthModule, BrowserModule, FormsModule, HttpClientModule, ProjectsRouting, ReactiveFormsModule, TranslateModule, UiModule],
})
export class ProjectsModule { }
