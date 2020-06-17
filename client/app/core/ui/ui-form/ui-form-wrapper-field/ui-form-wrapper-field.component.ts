import { Component, HostBinding, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { UiFormDirections, UiFormTypes } from '../ui-form.references';

@Component({
  selector: 'ui-form-wrapper-field',
  styleUrls: ['./ui-form-wrapper-field.component.scss'],
  templateUrl: './ui-form-wrapper-field.component.html',
})
export class UiFormWrapperFieldComponent extends FieldWrapper implements OnInit {
  @HostBinding('class.has-columns') public hasColumns = false;
  @HostBinding('class.has-offset') public hasOffset = false;

  public hasLabel = false;

  public ngOnInit(): void {
    this.hasColumns = this.getHasColumns();
    this.hasLabel = this.getHasLabel();
    this.hasOffset = this.to.hasOffset;
  }

  private getHasColumns(): boolean {
    const { label } = this.to;
    return typeof label === 'string' && label.length > 0 && this.to.fieldDirection === UiFormDirections.Horizontal;
  };

  private getHasLabel(): boolean {
    return this.to.label && this.field.type !== UiFormTypes.Checkbox;
  };
}