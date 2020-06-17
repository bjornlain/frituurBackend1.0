import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiDropdownService } from './ui-dropdown.service';

@Component({
  selector: 'ui-dropdown',
  styleUrls: ['./ui-dropdown.component.scss'],
  templateUrl: './ui-dropdown.component.html',
})
export class UiDropdownComponent implements OnDestroy {
  @Input() public caretless: boolean = false;
  @Input() public direction: string = 'down';
  @Input() public right: boolean = false;

  public visible: boolean = false;
  private subscription: Subscription;

  constructor(private uiDropdownService: UiDropdownService) {
    this.subscription = this.uiDropdownService.visible.subscribe((visible: boolean) => (this.visible = visible));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:click')
  @HostListener('document:keyup.escape')
  public outerClick(): void {
    this.visible = false;
  }

  public toggle(event: Event): void {
    event.stopPropagation();
    this.subscription.unsubscribe();
    this.uiDropdownService.visible.next(false);
    this.visible = !this.visible;
    this.subscription = this.uiDropdownService.visible.subscribe((visible: boolean) => (this.visible = visible));
  }
}
