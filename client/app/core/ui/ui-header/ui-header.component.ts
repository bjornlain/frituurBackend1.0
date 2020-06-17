import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  styleUrls: ['./ui-header.component.scss'],
  templateUrl: './ui-header.component.html',
})
export class UiHeaderComponent {
  @HostBinding('class')
  @Input() public class: string = 'large';

  @Input() public title: string;
}