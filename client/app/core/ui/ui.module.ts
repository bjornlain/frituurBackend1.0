import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { UiAvatarComponent } from './ui-avatar/ui-avatar.component';
import { UiButtonComponent } from './ui-button/ui-button.component';
import { UiCardComponent } from './ui-card/ui-card.component';
import { UiDatePickerComponent } from './ui-datepicker/ui-date-picker.component';
import { UiDialogComponent } from './ui-dialog/ui-dialog.component';
import { UiDialogService } from './ui-dialog/ui-dialog.service';
import { ViewContainerRefDirective } from './ui-dialog/viewContainerRef.directive';
import { UiDropdownComponent } from './ui-dropdown/ui-dropdown.component';
import { UiDropdownService } from './ui-dropdown/ui-dropdown.service';
import { UiFormCheckboxComponent } from './ui-form/ui-form-checkbox/ui-form-checkbox.component';
import { UiFormDateComponent } from './ui-form/ui-form-input-date/ui-form-date.component';
import { UiFormInputGroupComponent } from './ui-form/ui-form-input-group/ui-form-input-group.component';
import { UiFormInputComponent } from './ui-form/ui-form-input/ui-form-input.component';
import { UiFormLabelComponent } from './ui-form/ui-form-label/ui-form-label.component';
import { UiFormRepeatComponent } from './ui-form/ui-form-repeat/ui-form-repeat.component';
import { UiFormSelectComponent } from './ui-form/ui-form-select/ui-form-select.component';
import { UiFormTextareaComponent } from './ui-form/ui-form-textarea/ui-form-textarea.component';
import { UiFormWrapperFieldComponent } from './ui-form/ui-form-wrapper-field/ui-form-wrapper-field.component';
import { UiFormWrapperGroupComponent } from './ui-form/ui-form-wrapper-group/ui-form-wrapper-group.component';
import { UiFormWrapperSectionComponent } from './ui-form/ui-form-wrapper-section/ui-form-wrapper-section.component';
import { UiFormComponent } from './ui-form/ui-form.component';
import { UiFormTypes, UiFormWrappers } from './ui-form/ui-form.references';
import { UiHeaderComponent } from './ui-header/ui-header.component';
import { UiLoaderComponent } from './ui-loader/ui-loader.component';
import { UiNavbarComponent } from './ui-navbar/ui-navbar.component';
import { UiSidebarComponent } from './ui-sidebar/ui-sidebar.component';
import { UiSwitchComponent } from './ui-switch/ui-switch.component';
import { UiTableCountComponent } from './ui-table/ui-table-count/ui-table-count.component';
import { UiTableFilterComponent } from './ui-table/ui-table-filter/ui-table-filter.component';
import { UiTableTemplateComponent } from './ui-table/ui-table-template/ui-table-template.component';
import { UiTableComponent } from './ui-table/ui-table.component';
import { UiTabComponent } from './ui-tabs/ui-tab.component';
import { UiTabsComponent } from './ui-tabs/ui-tabs.component';

@NgModule({
  declarations: [
    UiAvatarComponent,
    UiCardComponent,
    UiButtonComponent,
    UiCardComponent,
    UiDialogComponent,
    UiDatePickerComponent,
    UiDropdownComponent,
    UiFormCheckboxComponent,
    UiFormComponent,
    UiFormInputComponent,
    UiFormDateComponent,
    UiFormInputGroupComponent,
    UiFormLabelComponent,
    UiFormRepeatComponent,
    UiFormSelectComponent,
    UiFormTextareaComponent,
    UiFormWrapperFieldComponent,
    UiFormWrapperGroupComponent,
    UiFormWrapperSectionComponent,
    UiButtonComponent,
    UiHeaderComponent,
    UiLoaderComponent,
    UiNavbarComponent,
    UiSidebarComponent,
    UiSwitchComponent,
    UiTabComponent,
    UiTabsComponent,
    UiTableComponent,
    UiTableCountComponent,
    UiTableTemplateComponent,
    UiTableFilterComponent,
    ViewContainerRefDirective,
  ],
  entryComponents: [UiDialogComponent],
  exports: [
    UiAvatarComponent,
    UiButtonComponent,
    UiCardComponent,
    UiDatePickerComponent,
    UiDropdownComponent,
    UiFormComponent,
    UiHeaderComponent,
    UiNavbarComponent,
    UiSidebarComponent,
    UiDropdownComponent,
    UiFormComponent,
    UiLoaderComponent,
    UiNavbarComponent,
    UiHeaderComponent,
    UiSidebarComponent,
    UiTabsComponent,
    UiTabComponent,
    UiSwitchComponent,
    UiSidebarComponent,
    UiHeaderComponent,
    UiNavbarComponent,
    UiDropdownComponent,
    UiFormComponent,
    UiTableComponent,
    UiTableTemplateComponent,
  ],
  imports: [
    CommonModule,
    FormlyModule.forRoot({
      extras: { checkExpressionOn: 'modelChange' },
      types: [
        { name: UiFormTypes.Checkbox, component: UiFormCheckboxComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Email, component: UiFormInputComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Number, component: UiFormInputComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Password, component: UiFormInputComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Repeat, component: UiFormRepeatComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Select, component: UiFormSelectComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Text, component: UiFormInputComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Textarea, component: UiFormTextareaComponent, wrappers: [UiFormWrappers.Field] },
        { name: UiFormTypes.Date, component: UiFormDateComponent, wrappers: [UiFormWrappers.Field] },
      ],
      validationMessages: [
        { name: 'email', message: 'This field has no valid e-mail address.' },
        { name: 'required', message: 'This field is required.' },
      ],
      wrappers: [
        { name: UiFormWrappers.Field, component: UiFormWrapperFieldComponent },
        { name: UiFormWrappers.Group, component: UiFormWrapperGroupComponent },
        { name: UiFormWrappers.Section, component: UiFormWrapperSectionComponent },
      ],
    }),
    FormsModule,
    AngularMyDatePickerModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FormsModule,
  ],
  providers: [UiDialogService, UiDropdownService],
})
export class UiModule {}

export { UiDialogConfig } from './ui-dialog/ui-dialog.config';
export { UiDialogRef } from './ui-dialog/ui-dialog.ref';
export { UiDialogService } from './ui-dialog/ui-dialog.service';

export { UiFormFactory } from './ui-form/ui-form.factory';
export * from './ui-form/ui-form.references';
export { UiFormService } from './ui-form/ui-form.service';
