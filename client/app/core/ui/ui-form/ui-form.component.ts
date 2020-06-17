import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UiFormFieldConfig, UiFormModel, UiFormOptions } from './ui-form.references';
import { UiFormService } from './ui-form.service';

@Component({
  selector: 'ui-form',
  styleUrls: ['./ui-form.component.scss'],
  templateUrl: './ui-form.component.html',
})
export class UiFormComponent implements OnInit {
  @Input() public fields: UiFormFieldConfig[];
  @Input() public form: FormGroup;
  @Input() public model: UiFormModel;
  @Input() public options: UiFormOptions;
  @Input() public readonly: boolean;

  constructor(private uiFormService: UiFormService) {
    this.form = uiFormService.form;
    this.model = uiFormService.model;
    this.options = uiFormService.options;
  }

  public ngOnInit(): void {
    if (this.readonly) {
      this.uiFormService.setReadonly(this.readonly);
    }
  }
}