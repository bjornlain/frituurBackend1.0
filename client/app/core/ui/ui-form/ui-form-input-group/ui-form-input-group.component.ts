import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ui-form-input-group',
  templateUrl: './ui-form-input-group.component.html',
  styleUrls: ['./ui-form-input-group.component.scss'],
})
export class UiFormInputGroupComponent {
  @Input() public icon: string;
  @Input() public prepend = false;
  @Input() public template: TemplateRef<any>;
}
