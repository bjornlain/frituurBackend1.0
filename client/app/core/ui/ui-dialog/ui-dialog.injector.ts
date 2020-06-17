import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';

export class UiDialogInjector implements Injector {
  constructor(private injector: Injector, private tokens: WeakMap<any, any>) {}

  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  get(token: any, notFoundValue?: any);

  get(token: any, notFoundValue?: any, flags?: any) {
    const value = this.tokens.get(token);
    return value ? value : this.injector.get<any>(token, notFoundValue);
  }
}