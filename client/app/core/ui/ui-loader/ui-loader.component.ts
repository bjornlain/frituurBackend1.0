import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-loader',
  templateUrl: './ui-loader.component.html',
  styleUrls: ['./ui-loader.component.scss']
})
export class UiLoaderComponent {

  // Inputs
  @Input() color: string;
  @Input() backcolor: string;

  constructor() { }
}
