import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-table-filter',
  templateUrl: './ui-table-filter.component.html',
  styleUrls: ['./ui-table-filter.component.scss'],
})
export class UiTableFilterComponent<T> {
  @Input() public rows: T[] = [];
  @Output() public onFilter: EventEmitter<T[]> = new EventEmitter();

  public filterPredicate: string;

  public filter(predicate: string): void {
    this.onFilter.next(
      this.rows.filter((row: T) =>
        Object.values(row)
          .filter((value: any) => typeof value === 'string')
          .find((value: any) => value.toLowerCase().includes(predicate.toLowerCase()))
      )
    );
  }
}
