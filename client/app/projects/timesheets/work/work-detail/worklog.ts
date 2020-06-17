import { Time } from '@angular/common';

export class Worklog {
  public project: string;
  public title: string;
  public description: string;
  public beginDate: Date;
  public endDate: Date;
  public time: Time;
}
