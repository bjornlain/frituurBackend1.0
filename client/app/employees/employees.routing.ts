import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LayoutMainComponent } from '../core/layout/layout-main/layout-main.component';

import { AssetsComponent } from './assets/assets.component';
import { ContractsComponent } from './contracts/contracts.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { InsurancesComponent } from './insurances/insurances.component';
import { EmployeesComponent } from './employees/employees.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DetailComponent } from './detail/detail.component';

import { AssetsComponent as AssetsDetailComponent } from './detail/assets/assets.component';
import { BasicComponent as BasicDetailComponent } from './detail/basic/basic.component';
import { ContractComponent as ContractDetailComponent } from './detail/contract/contract.component';
import { TimesheetsComponent as TimesheetsDetailComponent } from './detail/timesheets/timesheets.component';
import { VehicleComponent as VehicleDetailComponent } from './detail/vehicle/vehicle.component';

const routes: Routes = [
  { path: 'employees', redirectTo: 'employees/employees', pathMatch: 'full' },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    component: LayoutMainComponent,
    data: { color: 'txt-accent1', icon: 'fas fa-users', nav: true, title: 'employees' },
    children: [
      { path: 'employees', component: EmployeesComponent, data: { icon: 'fal fa-users', nav: true, title: 'employees' } },
      {
        path: 'detail/:id', component: DetailComponent, data: { icon: 'fal fa-file-contract', nav: true, title: 'Details' }, children: [

          { path: 'basic', component: BasicDetailComponent, data: { icon: 'fal fa-file-contract', nav: true, title: 'Details' } },
          { path: 'assets', component: AssetsDetailComponent, data: { icon: 'fal fa-file-contract', nav: true, title: 'Details' } },
          { path: 'vehicle', component: VehicleDetailComponent, data: { icon: 'fal fa-file-contract', nav: true, title: 'Details' } },
          { path: 'contract', component: ContractDetailComponent, data: { icon: 'fal fa-file-contract', nav: true, title: 'Details' } },
          { path: 'timesheets', component: TimesheetsDetailComponent, data: { icon: 'fal fa-file-contract', nav: true, title: 'Details' } }
        ]
      },
      { path: 'vehicles', component: VehiclesComponent, data: { icon: 'fal fa-car', nav: true, title: 'Vehicles' } },
      { path: 'insurances', component: InsurancesComponent, data: { icon: 'fal fa-house-flood', nav: true, title: 'Insurances' } },
      { path: 'incidents', component: IncidentsComponent, data: { icon: 'fal fa-car-crash', nav: true, title: 'Incidents' } },
      { path: 'assets', component: AssetsComponent, data: { icon: 'fal fa-tablet', nav: true, title: 'Assets' } },
      { path: 'contracts', component: ContractsComponent, data: { icon: 'fal fa-file-contract', nav: true, title: 'Contracts' } },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class EmployeesRouting { }
