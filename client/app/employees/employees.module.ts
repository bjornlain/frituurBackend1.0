import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { AssetsComponent } from './assets/assets.component';
import { ContractsComponent } from './contracts/contracts.component';
import { DetailComponent } from './detail/detail.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { InsurancesComponent } from './insurances/insurances.component';
import { EmployeesRouting } from './employees.routing';
import { EmployeesComponent } from './employees/employees.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

import { AssetsComponent as AssetsDetailComponent } from './detail/assets/assets.component';
import { BasicComponent as BasicDetailComponent } from './detail/basic/basic.component';
import { ContractComponent as ContractDetailComponent } from './detail/contract/contract.component';
import { TimesheetsComponent as TimesheetsDetailComponent } from './detail/timesheets/timesheets.component';
import { VehicleComponent as VehicleDetailComponent } from './detail/vehicle/vehicle.component';
import { AddemployeeDialogComponent } from './employees/addemployee-dialog/addemployee-dialog.component';
import { ConsultantListComponent } from './contracts/consultant-list/consultant-list.component';

@NgModule({
  declarations: [
    AssetsComponent,
    ContractsComponent,
    IncidentsComponent,
    InsurancesComponent,
    EmployeesComponent,
    VehiclesComponent,
    DetailComponent,

    AssetsDetailComponent,
    BasicDetailComponent,
    ContractDetailComponent,
    TimesheetsDetailComponent,
    VehicleDetailComponent,
    AddemployeeDialogComponent,
    ConsultantListComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    HttpClientModule,
    EmployeesRouting,
    TranslateModule.forRoot(),
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddemployeeDialogComponent]
})
export class EmployeesModule { }
