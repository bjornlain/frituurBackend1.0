import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UiFormFactory, UiFormFieldConfig, UiFormTypes } from '@core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public fields: UiFormFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public model: any = {};

  constructor(private authService: AuthService, private router: Router, private uiFormFactory: UiFormFactory) {
    this.fields = [
      this.uiFormFactory.createInput('email', 'E-mail address', { required: true }, { type: UiFormTypes.Email }),
      this.uiFormFactory.createInput('password', 'Password', { required: true }, { type: UiFormTypes.Password }),
    ];

  }

  public onSubmit(model: any): void {
    this.authService.isAuthenticated = true;
    this.router.navigate(['dashboard']);
  }
}