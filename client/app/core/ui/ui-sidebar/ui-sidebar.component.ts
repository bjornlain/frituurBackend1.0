import { Component, HostBinding } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'ui-sidebar',
  styleUrls: ['./ui-sidebar.component.scss'],
  templateUrl: './ui-sidebar.component.html',
})
export class UiSidebarComponent {
  public routes: Routes = [];

  constructor(private router: Router) {
    this.routes = this.filterRoutes(this.router.config);
  }

  @HostBinding('class.collapsed')
  public get collapsed(): boolean {
    return LocalStorageService.getItem('ui-sidebar:collapsed', false);
  }

  public set collapsed(value: boolean) {
    LocalStorageService.setItem('ui-sidebar:collapsed', value);
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }

  private filterRoutes(routes: Routes): Routes {
    return routes
      .filter((route: Route) => (route.component || route.children) && (route.data && route.data.nav))
      .map((route: Route) => {
        if (route.children) route.children = this.filterRoutes(route.children);
        return route;
      });
  }
}
