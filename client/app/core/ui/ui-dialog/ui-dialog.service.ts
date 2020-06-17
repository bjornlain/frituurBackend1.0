import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

import { UiDialogComponent } from './ui-dialog.component';
import { UiDialogConfig } from './ui-dialog.config';
import { UiDialogInjector } from './ui-dialog.injector';
import { UiDialogRef } from './ui-dialog.ref';

@Injectable()
export class UiDialogService {
  private uiDialogComponentComponentRef: ComponentRef<UiDialogComponent>;

  constructor(private applicationRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {}

  public open(componentType: Type<any>, config: UiDialogConfig): UiDialogRef {
    const uiDialogRef = this.appendDialogComponentToBody(config);
    this.uiDialogComponentComponentRef.instance.childComponentType = componentType;
    return uiDialogRef;
  }

  private appendDialogComponentToBody(config: UiDialogConfig): UiDialogRef {
    const map = new WeakMap();
    const uiDialogRef = new UiDialogRef();
    map.set(UiDialogConfig, config);
    map.set(UiDialogRef, uiDialogRef);

    const subscription = uiDialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      subscription.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiDialogComponent);
    const componentRef = componentFactory.create(new UiDialogInjector(this.injector, map));
    this.applicationRef.attachView(componentRef.hostView);
    const rootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(rootNode);

    this.uiDialogComponentComponentRef = componentRef;
    this.uiDialogComponentComponentRef.instance.onClose.subscribe(() => this.removeDialogComponentFromBody());

    return uiDialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.applicationRef.detachView(this.uiDialogComponentComponentRef.hostView);
    this.uiDialogComponentComponentRef.destroy();
  }
}