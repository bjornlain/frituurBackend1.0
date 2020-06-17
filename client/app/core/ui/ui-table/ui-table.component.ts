import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UiTableHeader } from './ui-table.references';

@Component({
  selector: 'ui-table',
  styleUrls: ['./ui-table.component.scss'],
  templateUrl: './ui-table.component.html',
})
export class UiTableComponent<T> {

  @Output() public reachedEnd: EventEmitter<any> = new EventEmitter();
  @Output() public sortChanged: EventEmitter<Sorter> = new EventEmitter();

  @Input() public totalRows?: number;
  @Input() public countLabel?: string;
  @Input() public headers: Array<UiTableHeader<T>> = [];
  @Input() public showHeaders: boolean = true;
  @Input() public filterable: boolean;
  @Input() public oddBackgrounded: boolean = true;

  @Input() set data(value: any) {

    this.allData = value;
    this.filteredData = value;
    this.totalRows = this.totalRows || value.length;
  }

  public allData: Array<T>;
  public filteredData: T[] = [];
  public currentSort: BehaviorSubject<Sorter | undefined> = new BehaviorSubject(undefined);

  constructor() {

    this.currentSort.subscribe(x => this.sortChanged.emit(x));
  }

  public onFilter(filteredRows: T[]) {

    this.filteredData = filteredRows;
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight)
      this.reachedEnd.next(undefined);
  }

  public toggleSort(head: UiTableHeader<any>) {

    const newSorter: Sorter = { header: head, direction: SorterDirection.UP };
    const invertedSorter: Sorter = { header: head, direction: SorterDirection.DOWN };

    if (head.isSortable)
      this.currentSort.next(
        (!this.currentSort.value || this.currentSort.value.header !== head) ?
          newSorter : this.currentSort.value.direction === SorterDirection.UP ?
            invertedSorter : undefined
      );
  }

  getColumnTemplating(): string {

    let output = '';
    this.headers.forEach(x => output += x.autoSize ? 'max-content ' : '1fr ');

    return output;
  }

  public getValue(data: T, keys: string | string[]): any {
    if (typeof keys === 'string') {
      return data[keys];
    }

    let output = data;
    keys.forEach((key: string) => (output = output[key]));
    return output;
  }
}

class Sorter {

  header: UiTableHeader<any>;
  direction: SorterDirection;
}

export enum SorterDirection {

  UP = 1,
  DOWN = -1
};