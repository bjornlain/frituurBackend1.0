import { Component } from '@angular/core';
import { UiFormFieldConfig, UiDialogConfig, UiDialogRef, UiFormFactory, UiFormTypes } from '@core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'addemployee-dialog',
  templateUrl: './addemployee-dialog.component.html',
  styleUrls: ['./addemployee-dialog.component.scss']
})
export class AddemployeeDialogComponent {

  public fields: UiFormFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public model: any = {};

  constructor(public config: UiDialogConfig, public dialog: UiDialogRef, private uiFormFactory: UiFormFactory) {

    this.fields = [

      this.uiFormFactory.createInput('birth_date', 'Birth date', { required: true }, { type: UiFormTypes.Date }),
      this.uiFormFactory.createInput('civil_status', 'Civil status', { required: true }, { type: UiFormTypes.Text }),
      this.uiFormFactory.createInput('first_name', 'First name', { required: true }, { type: UiFormTypes.Text }),
      this.uiFormFactory.createInput('last_name', 'Last name', { required: true }, { type: UiFormTypes.Text }),
      this.uiFormFactory.createInput('gender', 'Gender', { required: true }, { type: UiFormTypes.Text }),
      // TODO: WAGES FIELD
    ];
  }

  public onClose(action: DialogResult): void {

    if (this.form.invalid || action === DialogResult.CANCEL) this.model = {};

    this.dialog.close(this.model);
  }
}

export enum DialogResult {

  OK = 'ok',
  CANCEL = 'cancel'
}