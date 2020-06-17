import { Observable, Subject } from 'rxjs';

export class UiDialogRef {
  private readonly afterClosed$ = new Subject<any>();

  public afterClosed: Observable<any> = this.afterClosed$.asObservable();

  public close(result?: any): void {
    this.afterClosed$.next(result);
  }
}