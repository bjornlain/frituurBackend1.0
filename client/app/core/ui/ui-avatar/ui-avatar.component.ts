import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './ui-avatar.component.html',
  styleUrls: ['./ui-avatar.component.scss'],
})
export class UiAvatarComponent implements OnInit {

  @Input() public url: string;
  @Input() public name: string;

  public initials: string;

  public ngOnInit(): void {

    if (!this.url) this.initials = this.getInitials();
  }

  private getInitials = (): string => {

    if (this.name) return this.name.match(/\b(\w)/g).join('').slice(0, 2);

    return null;
  };
}
