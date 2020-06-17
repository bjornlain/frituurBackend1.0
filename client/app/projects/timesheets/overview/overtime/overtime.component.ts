import { Component, Input } from '@angular/core';
import { minutesToHHmmSS as formatMins } from '../../../../core/utilities/date.util';

@Component({
  selector: 'overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss'],
})
export class OvertimeComponent {
  @Input() public overtime: any;

  public remaining = () => formatMins(this.overtime.totalRemaining);

  public total = () => formatMins(this.overtime.totalThisYear);

  public returned = () => formatMins(this.overtime.returned);
}
