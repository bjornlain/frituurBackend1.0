import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UiFormFieldConfig } from '@core';
import { IAngularMyDpOptions, IMyCalendarViewChanged, IMyDateModel, IMyRangeDateSelection } from 'angular-mydatepicker';
import { RangeDateType } from '../ui.references';

@Component({
  selector: 'ui-datepicker',
  styleUrls: ['./ui-date-picker.component.scss'],
  templateUrl: './ui-date-picker.component.html',
})
export class UiDatePickerComponent implements OnInit {
  @Input() public rangeSelectionEnabled: boolean = false;
  @Input() public weekendEnabled: boolean = false;

  @Input() public formControl: FormControl;
  @Input() public formlyAttributes: UiFormFieldConfig;

  @Output() public dateRangeChanged: EventEmitter<any> = new EventEmitter(true);
  @Output() public dateChanged: EventEmitter<any> = new EventEmitter(true);

  public model: IMyDateModel = { isRange: true };

  public datePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    markCurrentDay: true,
    monthLabels: {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    },
    sunHighlight: false,
  };

  private dateSelected: boolean = false;

  public ngOnInit(): void {
    this.datePickerOptions.dateRange = this.rangeSelectionEnabled;
    this.datePickerOptions.inline = this.rangeSelectionEnabled;
    this.datePickerOptions.selectorWidth = this.rangeSelectionEnabled ? '100%' : '350px';
    this.datePickerOptions.selectorHeight = this.rangeSelectionEnabled ? '100%' : 'auto';

    this.model = { isRange: this.rangeSelectionEnabled };
  }

  public onCalendarViewChanged(event: IMyCalendarViewChanged): void {
    if (this.rangeSelectionEnabled && !this.dateSelected) {
      const beginDate = this.calculateDate(new Date(event.year, event.month - 1, event.first.number), RangeDateType.BeginDate);
      const endDate = this.calculateDate(new Date(event.year, event.month - 1, event.last.number), RangeDateType.EndDate);
      this.dateRangeChanged.emit({ beginDate, endDate });
    }
  }

  public onDateChanged(event: IMyDateModel): void {
    this.dateSelected = true;
    if (this.rangeSelectionEnabled) {
      this.dateRangeChanged.emit({ beginDate: event.dateRange.beginJsDate, endDate: event.dateRange.endJsDate });
    } else {
      this.dateChanged.emit({ date: event.singleDate.jsDate });
    }
  }

  public onRangeDateSelection(event: IMyRangeDateSelection): void {
    this.dateSelected = true;
    if (this.rangeSelectionEnabled && event.isBegin) {
      this.dateRangeChanged.emit({ beginDate: event.jsDate, endDate: event.jsDate });
    }
  }

  private calculateDate(date: Date, type: RangeDateType): Date {
    const day = date.getDay();

    const dateNotInWeekend = !(day % 6 === 0);
    if (dateNotInWeekend) {
      return date;
    }

    date.setDate(date.getDate() + (type === RangeDateType.BeginDate ? (day === 0 ? 1 : 2) : day === 0 ? -2 : -1));
    return date;
  }
}
