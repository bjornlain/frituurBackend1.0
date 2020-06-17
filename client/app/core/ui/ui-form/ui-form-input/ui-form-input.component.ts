import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ui-form-input',
  styleUrls: ['./ui-form-input.component.scss'],
  templateUrl: './ui-form-input.component.html',
})
export class UiFormInputComponent extends FieldType implements OnInit {
  public autocomplete: string;

  public ngOnInit(): void {
    this.autocomplete = this.to.autocomplete || 'off';
  }
}