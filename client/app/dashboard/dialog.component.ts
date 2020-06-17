import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UiDialogConfig, UiDialogRef, UiFormFactory, UiFormFieldConfig, UiFormTypes } from '@core';

@Component({
  selector: 'ng-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  public fields: UiFormFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public model: any = {};

  constructor(public config: UiDialogConfig, public dialog: UiDialogRef, private uiFormFactory: UiFormFactory) {
    this.fields = [
      this.uiFormFactory.createInput('email', 'email', { required: true }, { type: UiFormTypes.Email }),
      this.uiFormFactory.createInput('password', 'password', { required: true }, { type: UiFormTypes.Password }),
      this.uiFormFactory.createCheckbox('remember', 'remember', { hasOffset: true }),
    ];
  }

  public onClose(value): void {
    this.dialog.close(this.model);
  }
}