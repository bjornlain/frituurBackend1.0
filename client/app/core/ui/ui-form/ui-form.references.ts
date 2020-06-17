import { FormlyFormOptions } from '@ngx-formly/core';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core/lib/components/formly.field.config';
import { BehaviorSubject } from 'rxjs';

export interface UiFormFieldConfig extends FormlyFieldConfig {
  templateOptions?: UiFormTemplateOptions;
}

export interface UiFormModel {
  [key: string]: any;
}

export interface UiFormOptions extends FormlyFormOptions {
  formState: UiFormState;
}

export interface UiFormState {
  readonly$: BehaviorSubject<boolean>;
}

export interface UiFormTemplateOptions extends FormlyTemplateOptions {
  addon?: {
    icon: string;
    prepend?: boolean;
  };
  autocomplete?: 'on' | 'off';
  hasOffset?: boolean;
}

export enum UiFormTypes {
  Checkbox = 'checkbox',
  Date = 'datepicker',
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Repeat = 'repeat',
  Select = 'select',
  Text = 'text',
  Textarea = 'textarea',
}

export enum UiFormWrappers {
  Field = 'ui-form-wrapper-field',
  Group = 'ui-form-wrapper-group',
  Section = 'ui-form-wrapper-section',
}

export enum UiFormDirections {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
