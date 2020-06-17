import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard.routing';
import { DialogComponent } from './dialog.component';
import { TimeOverviewComponent } from './time-overview/time-overview.component';
import { BrowserModule } from "@angular/platform-browser";
import { MultiplyPipe } from './pipes/multiply.pipe';
import { AssetsInformationComponent } from './assets-information/assets-information.component';
import { VehiclesInformationComponent } from './vehicles-information/vehicles-information.component';

@NgModule({
  declarations: [DashboardComponent, DialogComponent, TimeOverviewComponent, MultiplyPipe, AssetsInformationComponent, VehiclesInformationComponent],
  entryComponents: [DialogComponent],
  imports: [AuthModule, DashboardRouting, TranslateModule, UiModule, ReactiveFormsModule, BrowserModule]
})
export class DashboardModule {}
