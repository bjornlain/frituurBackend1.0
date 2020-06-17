import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Employee } from 'app/core/models/employee.interface';
import { UiTableHeader } from 'app/core/ui/ui-table/ui-table.references';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'app/core/services/employee.service';
import { UiFormFactory, UiFormFieldConfig, UiFormTypes } from '@core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {

  public mode: Array<ViewMode> = [ViewMode.READ];

  public fields: UiFormFieldConfig[];
  public form: FormGroup = new FormGroup({});

  public employee: Employee | undefined;
  public tableHeaders: Array<UiTableHeader<Employee>> = [];

  private _onDestroy: Subject<boolean> = new Subject();

  @ViewChild('employeeTemplate', { static: true }) private _employeeTemplate: TemplateRef<any>;

  constructor(private _activatedRoute: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _uiFormFactory: UiFormFactory) {

    this._activatedRoute.params.pipe(takeUntil(this._onDestroy)).subscribe(params => {

      const id = params['id'];

      if (id)
        this._employeeService.info(id).then(x => this.employee = x);
      else this.employee = undefined;
    });

    this.tableHeaders = [
      {
        key: 'first_name', template: this._employeeTemplate
      }
    ];

    this.fields = [
      this._uiFormFactory.createInput('last_name', 'Last name', { required: true }, { type: UiFormTypes.Text }),
      this._uiFormFactory.createInput('first_name', 'First name', { required: true }, { type: UiFormTypes.Text }),
      // START DATE HERE
      // this._uiFormFactory.createInput('function', 'function', { required: true }, { type: UiFormTypes.Text }),
      this._uiFormFactory.createInput('position', 'Position', { required: true }, { type: UiFormTypes.Text }),
      // CV UPLOAD HERE
      // HIGHTLIGHTS HERE

      // ADD BIRTH DATE HERE
      this._uiFormFactory.createInput('birth_place', 'Birthplace', { required: false }, { type: UiFormTypes.Text }),
      // this._uiFormFactory.createInput('birth_country', '', { required: false }, { type: UiFormTypes.Text }),
      this._uiFormFactory.createInput('nationality', '', { required: false }, { type: UiFormTypes.Text }),

      this._uiFormFactory.createSelect('gender', [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }], 'Gender'),
      this._uiFormFactory.createSelect('civil_state',
        [{ value: 'divorced', label: 'Divorced' }, { value: 'married', label: 'Married' }, { value: 'single', label: 'Single' }, { value: 'together', label: 'Together' }, { value: 'widow/widower', label: 'Widow/Widower' }],
        'Civil state'),
      this._uiFormFactory.createInput('education', 'Level of education', { type: UiFormTypes.Email }),
      this._uiFormFactory.createInput('line1', 'Adress', { type: UiFormTypes.Text }),
      this._uiFormFactory.createInput('line2', '', { type: UiFormTypes.Text }),
      this._uiFormFactory.createInput('country', '', { type: UiFormTypes.Text }),

      this._uiFormFactory.createInput('identity_card_number', 'ID Card nr.', { type: UiFormTypes.Text }),
      this._uiFormFactory.createInput('social_security_number', 'Social security nr.', { type: UiFormTypes.Text }),
      this._uiFormFactory.createCheckbox('deleted', 'Disabled'),

      this._uiFormFactory.createInput('work_contact.mobile', 'Phone (work)'),
      this._uiFormFactory.createInput('work_contact.mobile', 'Mobile phone'),
      this._uiFormFactory.createInput('work_contact.mobile', 'Home phone'),
      this._uiFormFactory.createInput('work_contact.mobile', 'Work email', { type: UiFormTypes.Email }),
      this._uiFormFactory.createInput('work_contact.mobile', 'Personal email', { type: UiFormTypes.Email }),
    ];
  }

  public onSubmit(model: any): void {

    console.log(model);
  }

  public toggleMode(mode: ViewMode): void {

    if (this.mode.includes(mode)) this.mode = this.mode.filter(x => x !== mode);
    else this.mode.push(mode);
  }
}

enum ViewMode {
  EDIT,
  READ
}