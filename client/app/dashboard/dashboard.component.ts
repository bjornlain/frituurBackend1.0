import { Component } from '@angular/core';
import { UiDialogService } from '@core';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private uiDialogService: UiDialogService) { }

  public openDialog() {
    const dialog = this.uiDialogService.open(DialogComponent, { data: { message: 'I am a dynamic component inside of a dialog!' } });
    dialog.afterClosed.subscribe(result => console.log('Dialog closed', result));
  }
}
