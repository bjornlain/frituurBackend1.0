import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-table-count',
  templateUrl: './ui-table-count.component.html',
  styleUrls: ['./ui-table-count.component.scss'],
})
export class UiTableCountComponent {

  @Input() public current: number;
  @Input() public total: number;
  @Input() public label: string;
}
