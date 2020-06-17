import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  styleUrls: ['./ui-button.component.scss'],
  templateUrl: './ui-button.component.html'
})
export class UiButtonComponent {

  @Input() disabled: boolean = false;
  @Input() type: string = 'button';
}