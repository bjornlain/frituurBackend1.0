import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-tab',
  styleUrls: ['./ui-tab.component.scss'],
  templateUrl: './ui-tab.component.html'
})
export class UiTabComponent {
  @HostBinding('class.active')
  @Input() public active: boolean = false;

  @HostBinding('class.disabled')
  @Input() public disabled: boolean = false;

  @Input() public header: string;
}