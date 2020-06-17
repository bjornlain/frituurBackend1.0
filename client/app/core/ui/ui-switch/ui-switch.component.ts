import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-switch',
  styleUrls: ['./ui-switch.component.scss'],
  templateUrl: './ui-switch.component.html'
})
export class UiSwitchComponent {
  @Input() public active: boolean = false;
  @Input() public disabled: boolean = false;

  public toggle(): void {
    this.active = !this.active;
  }
}