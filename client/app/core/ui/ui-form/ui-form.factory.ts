import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UiFormDirections, UiFormFieldConfig, UiFormTemplateOptions, UiFormTypes, UiFormWrappers } from './ui-form.references';
import { UiFormService } from './ui-form.service';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Config = Omit<UiFormFieldConfig, 'key' | 'templateOptions'>;

@Injectable({ providedIn: 'root' })
export class UiFormFactory {

  constructor(private uiFormService: UiFormService) { }

  public createTextarea = (
    key?: string,
    label?: string,
    templateOptions: UiFormTemplateOptions = {},
    config: Config = {}
  ): UiFormFieldConfig => {
    const { type = UiFormTypes.Textarea, validators = null } = config;
    return {
      expressionProperties: {
        'templateOptions.readonly': this.isReadonly$(templateOptions.readonly),
        'templateOptions.required': this.isRequired$(templateOptions),
      },
      key,
      modelOptions: { updateOn: 'blur' },
      templateOptions: { label, placeholder: label, fieldDirection: UiFormDirections.Vertical, ...templateOptions },
      type,
      validators,
    };
  };

  public createCheckbox = (key: string, label: string, templateOptions: UiFormTemplateOptions = {}): UiFormFieldConfig => ({
    expressionProperties: {
      'templateOptions.disabled': this.isDisabled$(templateOptions),
      'templateOptions.readonly': this.isReadonly$(templateOptions.readonly),
    },
    key,
    templateOptions: { label, ...templateOptions },
    type: UiFormTypes.Checkbox,
  });

  public createRepeat = (key: string, label: string, field: UiFormFieldConfig) => ({
    expressionProperties: {
      'templateOptions.readonly': this.uiFormService.getReadonly(),
    },
    fieldArray: field,
    key,
    templateOptions: { label },
    type: UiFormTypes.Repeat,
  });

  public createSelect = (
    key: string,
    options: any[],
    label?: string,
    templateOptions: UiFormTemplateOptions = {},
    config: Config = {}
  ): UiFormFieldConfig => {
    const { validators = null } = config;
    return {
      expressionProperties: {
        'templateOptions.disabled': this.isDisabled$(templateOptions),
        'templateOptions.readonly': this.isReadonly$(templateOptions.readonly),
        'templateOptions.required': this.isRequired$(templateOptions),
      },
      key,
      modelOptions: { updateOn: 'blur' },
      templateOptions: { label, options, placeholder: label, ...templateOptions },
      type: UiFormTypes.Select,
      validators,
    };
  };

  public createInput = (
    key?: string,
    label?: string,
    templateOptions: UiFormTemplateOptions = {},
    config: Config = {}
  ): UiFormFieldConfig => {
    const { type = UiFormTypes.Text, validators = null } = config;
    return {
      expressionProperties: {
        'templateOptions.readonly': this.isReadonly$(templateOptions.readonly),
        'templateOptions.required': this.isRequired$(templateOptions),
      },
      key,
      modelOptions: { updateOn: 'blur' },
      templateOptions: { label, placeholder: label, fieldDirection: UiFormDirections.Vertical, ...templateOptions },
      type,
      validators,
    };
  };

  public createInputDate = (
    key?: string,
    label?: string,
    templateOptions: UiFormTemplateOptions = {},
    config: Config = {}
  ): UiFormFieldConfig => {
    const { type = UiFormTypes.Date, validators = null } = config;
    return {
      expressionProperties: {
        'templateOptions.readonly': this.isReadonly$(templateOptions.readonly),
        'templateOptions.required': this.isRequired$(templateOptions),
      },
      key,
      modelOptions: { updateOn: 'blur' },
      templateOptions: { label, placeholder: label, fieldDirection: UiFormDirections.Vertical, ...templateOptions },
      type,
      validators,
    };
  };

  public createWrapperGroup = (
    label: string,
    fields: UiFormFieldConfig[],
    fieldDirection: UiFormDirections = UiFormDirections.Vertical
  ): UiFormFieldConfig => {
    const hasRequiredFields = fields.some(
      ({ templateOptions }: UiFormFieldConfig) => templateOptions.required && !templateOptions.readonly
    );
    return {
      expressionProperties: {
        'templateOptions.required': this.uiFormService.options.formState.readonly$.getValue() ? of(false) : of(hasRequiredFields),
      },
      fieldGroup: fields,
      templateOptions: { label, hideLabel: label === null, fieldDirection },
      wrappers: [UiFormWrappers.Group],
    };
  };

  public createWrapperSection = (key: string, label: string, fieldGroup: UiFormFieldConfig[]): UiFormFieldConfig => ({
    fieldGroup,
    key,
    templateOptions: { label },
    wrappers: [UiFormWrappers.Section],
  });

  private isDisabled$ = ({ disabled, readonly }: UiFormTemplateOptions): Observable<boolean> =>
    disabled ? of(disabled) : this.isReadonly$(readonly);

  private isReadonly$ = (readonly: boolean): Observable<boolean> => (readonly ? of(readonly) : this.uiFormService.getReadonly());

  private isRequired$ = ({ disabled, readonly, required }: UiFormTemplateOptions, value: boolean = false): Observable<boolean> =>
    this.isReadonly$(readonly).pipe(map((r: boolean) => (disabled || readonly || r ? false : value || required)));
}
