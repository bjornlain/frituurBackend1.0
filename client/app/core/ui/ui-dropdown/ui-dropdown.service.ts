import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UiDropdownService {
  public visible: Subject<boolean> = new Subject<boolean>();
}
