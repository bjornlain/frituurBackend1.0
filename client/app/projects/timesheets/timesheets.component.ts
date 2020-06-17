import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'timesheets',
  styleUrls: ['./timesheets.component.scss'],
  templateUrl: './timesheets.component.html',
})
export class TimesheetsComponent {
  public beginDate: Date;
  public endDate: Date;
  public showWorkDetail: boolean = false;
  public currentProject: any;

  public onDateRangeChanged($event: any): void {
    this.beginDate = $event.beginDate;
    this.endDate = $event.endDate;
  }

  public onCancelWorkDetail(): void {
    this.showWorkDetail = false;
  }

  public onProjectSelected($event: any): void {
    this.showWorkDetail = true;
    this.currentProject = $event;
  }

  public getFormattedMonthYear(): string {
    if (!this.beginDate && !this.endDate) {
      return '';
    }
    if (this.beginDate) {
      return `${this.beginDate.toLocaleString('default', { month: 'long' })} ${this.beginDate.getFullYear()}`;
    }
    if (this.endDate) {
      return `${this.endDate.toLocaleString('default', { month: 'long' })} ${this.endDate.getFullYear()}`;
    }
  }

  public getSelectedDays(): number {
    if (!this.beginDate || !this.endDate) {
      return 0;
    }
    return this.calculateWorkingDays(this.beginDate, this.endDate);
  }

  private calculateWorkingDays(begin: Date, end: Date): number {
    const day = moment(begin);
    let workingDays = 0;

    while (day.isSameOrBefore(end, 'day')) {
      if (day.day() % 6 !== 0) {
        workingDays += 1;
      }
      day.add(1, 'd');
    }
    return workingDays;
  }
}
