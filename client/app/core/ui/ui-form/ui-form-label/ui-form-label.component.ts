import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-form-label',
  styleUrls: ['./ui-form-label.component.scss'],
  templateUrl: './ui-form-label.component.html',
})
export class UiFormLabelComponent {
  @Input() public label: string;
}