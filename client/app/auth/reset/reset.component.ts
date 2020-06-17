import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UiFormFactory, UiFormFieldConfig, UiFormTypes } from '@core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
  public fields: UiFormFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public model: any = {};

  constructor(private authService: AuthService, private router: Router, private uiFormFactory: UiFormFactory) {
    this.fields = [
      {
        key: 'password',
        validators: {
          fieldMatch: {
            expression: ({ value }: FormControl) => value.password === value.passwordConfirm,
            message: 'Password Not Matching',
            errorPath: 'passwordConfirm',
          },
        },
        fieldGroup: [
          this.uiFormFactory.createInput('password', 'Password', { required: true }, { type: UiFormTypes.Password }),
          this.uiFormFactory.createInput('passwordConfirm', 'Confirm password', { required: true }, { type: UiFormTypes.Password }),
        ],
      },
    ];
  }

  public onSubmit(model: any): void {
    this.authService.isAuthenticated = true;
    this.router.navigate(['dashboard']);
  }
}