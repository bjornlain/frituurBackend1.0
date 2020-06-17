import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';

import { UiDialogRef } from './ui-dialog.ref';
import { ViewContainerRefDirective } from './viewContainerRef.directive';

@Component({
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ],
  selector: 'ui-dialog',
  styleUrls: ['./ui-dialog.component.scss'],
  templateUrl: './ui-dialog.component.html'
})
export class UiDialogComponent implements AfterViewInit, OnDestroy {
  private componentRef: ComponentRef<any>;
  private readonly close$ = new Subject<any>();

  public childComponentType: Type<any>;
  public onClose = this.close$.asObservable();

  @ViewChild(ViewContainerRefDirective, { static: false })
  public viewContainerRefDirective: ViewContainerRefDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetectorRef: ChangeDetectorRef, private uiDialogRef: UiDialogRef) {}

  public ngAfterViewInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponentType);
    const viewContainerRef = this.viewContainerRefDirective.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.componentRef) this.componentRef.destroy();
  }

  public handleDialogClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('document:keyup.escape')
  public handleOverlayClick(): void {
    this.uiDialogRef.close();
  }
}