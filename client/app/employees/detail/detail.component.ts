import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Employee } from 'app/core/models/employee.interface';
import { UiTableHeader } from 'app/core/ui/ui-table/ui-table.references';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'app/core/services/employee.service';
import { takeUntil } from 'rxjs/operators';
import { UiFormFieldConfig } from '@core';
@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public fields: UiFormFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public employees: Array<Employee>;
  public employee: Employee | undefined;
  public tableHeaders: Array<UiTableHeader<Employee>> = [];

  private _onDestroy: Subject<boolean> = new Subject();

  @ViewChild('employeeTemplate', { static: true }) private _employeeTemplate: TemplateRef<any>;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) {
    this._employeeService
      .list()
      .then(x => (this.employees = x))
      .catch(x => console.log(x));

    this._activatedRoute.params.pipe(takeUntil(this._onDestroy)).subscribe(params => {
      const id = params['id'];

      if (id) {
        this._employeeService
          .info(id)
          .then(x => {
            this.employee = x;

            if (x) this._router.navigate([`/employees/detail/${x.id}/basic`]);
          })
          .catch(x => this._router.navigate(['/employees']));
      } else this.employee = undefined;
    });
  }

  ngOnInit(): void {
    this.tableHeaders = [{ key: 'last_name', template: this._employeeTemplate, condensed: true }];
  }
}
