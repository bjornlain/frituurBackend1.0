import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'ui-form-repeat',
  styleUrls: ['./ui-form-repeat.component.scss'],
  templateUrl: './ui-form-repeat.component.html',
})
export class UiFormRepeatComponent extends FieldArrayType {}
