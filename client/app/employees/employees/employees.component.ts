import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Employee } from 'app/core/models/employee.interface';
import { UiTableHeader } from '../../core/ui/ui-table/ui-table.references';
import { EmployeeService } from 'app/core/services/employee.service';
import { UiDialogService } from '@core';
import { AddemployeeDialogComponent } from './addemployee-dialog/addemployee-dialog.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'employees',
  styleUrls: ['./employees.component.scss'],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {

  public headers: UiTableHeader<Employee>[];
  public dataset: Array<Employee>;
  public data: Array<Employee> = [];
  public currentdataset = 1;

  @ViewChild('avatarTemplate', { static: true }) public avatarTemplate: TemplateRef<Employee>;
  @ViewChild('emailTemplate', { static: true }) public emailTemplate: TemplateRef<Employee>;
  @ViewChild('nameTemplate', { static: true }) public nameTemplate: TemplateRef<Employee>;

  constructor(private _employeeService: EmployeeService, private _uiDialogService: UiDialogService) { }

  ngOnInit(): void {

    this.headers = [

      { key: 'avatar', template: this.avatarTemplate, autoSize: true },
      { label: 'Name', key: 'last_name', template: this.nameTemplate, isSortable: true },
      { label: 'Function', key: 'position', isSortable: true },
      { label: 'Email', key: ['work_contact', 'email'], template: this.emailTemplate },
      { label: 'Phone', key: ['work_contact', 'mobile'] },
    ];

    this._employeeService.list().then(x => {
      this.dataset = x; this.loadData()
    }).catch(x => console.log(x));
  }

  public getName = ({ first_name, last_name }): string => `${ first_name } ${ last_name }`;

  public loadData(): void {

    if (this.dataset) {

      this.currentdataset += 1;
      this.data = this.dataset.slice(0, this.currentdataset * 10);
    }
  }

  changedSort(sorter: any) {

    console.log(sorter);
  }

  public openDialog() {

    const dialog = this._uiDialogService.open(AddemployeeDialogComponent, { data: { message: 'I am a dynamic component inside of a dialog!' } });

    dialog.afterClosed.pipe(take(1)).subscribe(result => {

      console.log('Dialog closed', result);

      if (result) {

        // TODO: Add employee
      }
    });
  }
}
