import { Component, OnInit } from '@angular/core';
import {
  datesAreOnTheSameDay as sameDay,
  datesAreOnTheSameMonth as sameMonth,
  getWeekOfTheYear as getWeek,
} from '../../../core/utilities/date.util';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  // All worklogs for current user
  public worklogs = [];
  // TODO: perhaps this could be dynamic depending on contract for consultants;
  public workWeek = { days: 5, hours: 40 * 60 };

  // Info on the current date
  public today: Date = new Date();
  public week: number = getWeek(this.today);
  public hoursThisYear: number = 0;

  // Data to pass to sub-components
  public totalHours = { today: 0, thisWeek: 0, thisMonth: 0 };
  public balanceToWork = { today: 0, thisWeek: 0, thisMonth: 0 };
  public overtime = { totalThisYear: 0, totalRemaining: 0, returned: 0 };

  public ngOnInit(): void {
    // TODO: replace with NGRX to get data based on current user (?based on current year?)
    this.worklogs = mockData;
    // Loop over all worklogs for current user to calc all hours worked/overtime made
    this.processWorkLogs();
  }

  public processWorkLogs = () => {
    // Loop over all worklogs for current user, calc total hours
    this.worklogs.forEach((worklog: any) => {
      this.calcHours(worklog);
      this.hoursThisYear += worklog.worked;
    });
    // calc balance to work based on total hours this month
    this.calcBalance();
    // calc overtime to work based on total hours this year
    this.calcoverTime();
  };

  // Calculate hours worked for current month
  public calcHours = worklog => {
    // Full worklog date
    const date = new Date(Date.parse(worklog.date));
    // Same day as today worklogs
    if (sameDay(date, this.today)) {
      this.totalHours.today += worklog.worked;
    }
    // Same week as today worklogs
    if (getWeek(date) === this.week) {
      this.totalHours.thisWeek += worklog.worked;
    }
    // Same month as today worklogs
    if (sameMonth(date, this.today)) {
      this.totalHours.thisMonth += worklog.worked;
    }
  };

  // Calculate work hours needed to complete this month's remaining labor
  public calcBalance = () => {
    const { today, thisWeek, thisMonth } = this.totalHours;
    const { days, hours } = this.workWeek;
    let balanceToday = this.noNegative(hours / days - today);
    let balanceThisWeek = this.noNegative(hours - thisWeek);
    const balanceThisMonth = this.noNegative(hours * 4 - thisMonth);
    if (balanceThisWeek === 0) {
      balanceToday = 0;
    }
    if (balanceThisMonth === 0) {
      balanceToday = 0;
      balanceThisWeek = 0;
    }
    this.balanceToWork = { today: balanceToday, thisWeek: balanceThisWeek, thisMonth: balanceThisMonth };
  };

  // Calculate overtime made in the current year
  public calcoverTime = () => {
    const { hours } = this.workWeek;
    const total = this.noNegative(this.hoursThisYear - this.week * hours);
    // TODO: calculate remaining and spent from ??source??
    this.overtime = { totalThisYear: total, totalRemaining: total, returned: 0 };
  };

  // Numberr below zero equals zero
  public noNegative = balance => {
    return balance < 0 ? 0 : balance;
  };
}

const mockData = [
  {
    worked: 500,
    date: '2020-01-04T14:51:06.157Z',
  },
  {
    worked: 620,
    date: '2020-01-05T14:51:06.157Z',
  },
  {
    worked: 510,
    date: '2020-01-06T14:51:06.157Z',
  },
  {
    worked: 490,
    date: '2020-01-07T14:51:06.157Z',
  },
  {
    worked: 200,
    date: '2020-01-15T14:51:06.157Z',
  },
  {
    worked: 5100,
    date: '2020-01-07T14:51:06.157Z',
  },
];
