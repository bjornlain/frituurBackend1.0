import { Component, OnInit } from '@angular/core';
import {Timeoverview} from "../../core/models/timeoverview.interface";
import {TimeOverviewService} from "../../core/services/time-overview.service";

@Component({
  selector: 'time-overview',
  templateUrl: './time-overview.component.html',
  styleUrls: ['./time-overview.component.scss']
})
export class TimeOverviewComponent implements OnInit {

  public dataset: Array<Timeoverview>;
  constructor(private _timeOverviewService : TimeOverviewService) { }

  ngOnInit() {
    this.dataset = this._timeOverviewService.getAll();
  }
}
