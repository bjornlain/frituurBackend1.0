import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[viewContainerRef]' })
export class ViewContainerRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}