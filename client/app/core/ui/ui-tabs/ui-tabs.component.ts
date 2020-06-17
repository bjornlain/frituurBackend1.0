import { Component, ContentChildren, QueryList } from '@angular/core';

import { UiTabComponent } from './ui-tab.component';

@Component({
  selector: 'ui-tabs',
  styleUrls: ['./ui-tabs.component.scss'],
  templateUrl: './ui-tabs.component.html'
})
export class UiTabsComponent {
  @ContentChildren(UiTabComponent)
  public tabs: QueryList<UiTabComponent>;

  public select(tab): void {
    if (tab.disabled) return;
    const active = this.tabs.find(tab => tab.active);
    if (!active || active === tab) return;
    active.active = false;
    tab.active = true;
  }
}