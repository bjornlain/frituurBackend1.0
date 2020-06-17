import { Component, Input } from '@angular/core';
import { minutesToHHmmSS as formatMins } from '../../../../core/utilities/date.util';

@Component({
  selector: 'hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss'],
})
export class HoursComponent {
  @Input() public hours: any;
  @Input() public balance: any;

  public hoursToday = () => formatMins(this.hours.today);

  public hoursThisWeek = () => formatMins(this.hours.thisWeek);

  public hoursThisMonth = () => formatMins(this.hours.thisMonth);

  public balanceToday = () => formatMins(this.balance.today);

  public balanceThisWeek = () => formatMins(this.balance.thisWeek);

  public balanceThisMonth = () => formatMins(this.balance.thisMonth);
}
