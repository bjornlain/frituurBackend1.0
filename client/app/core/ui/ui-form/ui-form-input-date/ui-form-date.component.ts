import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { UiDatePickerComponent } from '../../ui-datepicker/ui-date-picker.component';

@Component({
  selector: 'ui-form-text',
  styleUrls: ['./ui-form-date.component.scss'],
  templateUrl: './ui-form-date.component.html',
})
export class UiFormDateComponent extends FieldType implements OnInit, OnDestroy {
  @ViewChild('datepicker', { static: true }) public datepicker: UiDatePickerComponent;
  private valueChangeSubscription: Subscription;

  public ngOnInit(): void {
    this.valueChangeSubscription = this.field.formControl.valueChanges.subscribe((value: Date) => {
      if (this.datepicker && this.datepicker.model) {
        this.datepicker.model = { ...this.datepicker.model, singleDate: { jsDate: value } };
      }
    });
  }

  public ngOnDestroy(): void {
    this.valueChangeSubscription.unsubscribe();
  }
}
