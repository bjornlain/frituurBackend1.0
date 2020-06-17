import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UiFormFactory, UiFormFieldConfig, UiFormTypes } from '@core';
import { Worklog } from './worklog';

@Component({
  selector: 'work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss'],
})
export class WorkDetailComponent implements OnChanges {
  @Input() public beginDate: Date;
  @Input() public endDate: Date;
  @Input() public time: Time;
  @Input() public project: any;
  @Output() public cancelClicked: EventEmitter<any> = new EventEmitter(true);
  public fields: UiFormFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public model: Worklog = new Worklog();

  constructor(private uiFormFactory: UiFormFactory) {
    this.fields = [
      this.uiFormFactory.createWrapperGroup(null, [
        this.uiFormFactory.createSelect(
          'project',
          [
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
            { value: 3, label: 'Option 3' },
            { value: 4, label: 'Option 4' },
          ],
          null,
          { required: true },
          { type: UiFormTypes.Select }
        ),
      ]),
      this.uiFormFactory.createInput('title', 'Project/task', { required: true }, { type: UiFormTypes.Text }),
      this.uiFormFactory.createTextarea('description', 'Description', {}, { type: UiFormTypes.Textarea }),
      this.uiFormFactory.createWrapperGroup(null, [
        this.uiFormFactory.createInputDate('beginDate', 'Start date', { required: true }, { type: UiFormTypes.Date }),
        this.uiFormFactory.createInput('time', 'Time', { required: true }, { type: UiFormTypes.Text }),
      ]),
      this.uiFormFactory.createInputDate('endDate', 'End date', {}, { type: UiFormTypes.Date }),
    ];
  }

  public onSubmit(model: any): void {
    console.log('Submit!', model);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const [key, value] of Object.entries(changes)) {
      this.model[key] = value.currentValue;
    }
    this.model = { ...this.model };
  }

  public cancel(): void {
    this.cancelClicked.emit();
  }
}
