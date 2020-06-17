import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { UiFormModel, UiFormOptions } from './ui-form.references';

@Injectable({ providedIn: 'root' })
export class UiFormService {
  public form: FormGroup = new FormGroup({}, { updateOn: 'submit' });
  public model: UiFormModel = {};
  public options: UiFormOptions = {
    formState: { readonly$: new BehaviorSubject<boolean>(false) },
  };

  public getReadonly(): Observable<boolean> {
    return this.options.formState.readonly$.asObservable();
  }

  public setReadonly(readonly: boolean): void {
    this.options.formState.readonly$.next(readonly);
  }
}
