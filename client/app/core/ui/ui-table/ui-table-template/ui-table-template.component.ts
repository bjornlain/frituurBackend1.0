import { Component, Input } from '@angular/core';
import { UiTableTemplateType } from '../ui-table.references';

@Component({
  selector: 'ui-table-template',
  templateUrl: './ui-table-template.component.html',
  styleUrls: ['./ui-table-template.component.scss'],
})
export class UiTableTemplateComponent {
  @Input() public type: UiTableTemplateType;
  @Input() public data: any;
}
