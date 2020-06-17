import { Component, HostBinding, Input } from '@angular/core';

import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'ui-navbar',
  styleUrls: ['./ui-navbar.component.scss'],
  templateUrl: './ui-navbar.component.html',
})
export class UiNavbarComponent {
  @Input() public brand: string;

  @HostBinding('class.collapsed')
  public get collapsed(): boolean {
    return LocalStorageService.getItem('ui-sidebar:collapsed', false);
  }
}
