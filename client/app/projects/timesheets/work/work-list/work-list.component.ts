import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { minutesToHHmmSS as formatMins } from '../../../../core/utilities/date.util';

@Component({
  selector: 'work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
})
export class WorkListComponent implements OnChanges {
  get workItems(): any[] {
    const x = this.data.filter((data: any) => data.date >= this.beginDate && data.date <= this.endDate);

    return [...new Set(x.map((item: any) => item.project))].map((projectName: string) => {
      const projectData = this.data.filter((data: any) => data.project === projectName);
      const totalTime = projectData.map((data: any) => data.time).reduce((a: number, b: number) => a + b, 0);
      return { projectName, totalTime, projectData };
    });
  }

  @Input() public beginDate: Date;
  @Input() public endDate: Date;
  @Output() public onEditEvent = new EventEmitter<any>();

  public days = 99;

  public data = [
    {
      project: 'Haystack project',
      task: 'Database cleaning',
      time: 480,
      date: new Date(2020, 0, 1),
    },
    {
      project: 'Omarmen',
      task: 'SCSS-Styling',
      time: 480,
      date: new Date(2020, 0, 15),
    },
    {
      project: 'Meeting intern',
      task: 'Meeting',
      time: 480,
      date: new Date(2020, 0, 20),
    },
    {
      project: 'Omarmen',
      task: 'development',
      time: 240,
      date: new Date(2020, 0, 25),
    },
    {
      project: 'haystack',
      task: 'Database cleaning',
      time: 480,
      date: new Date(2020, 0, 30),
    },
  ];

  public formatMinutes = formatMins;

  private openIndex: number[] = [];

  public toggleIndex(i: number): void {
    if (this.openIndex.includes(i)) {
      this.openIndex.splice(this.openIndex.indexOf(this.openIndex.find((x: number) => x === i)), 1);
    } else {
      this.openIndex.push(i);
    }
  }

  public onEdit(project: any): void {
    this.onEditEvent.emit(project);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.beginDate = changes.beginDate.currentValue;
    this.endDate = changes.endDate.currentValue;
  }
}
