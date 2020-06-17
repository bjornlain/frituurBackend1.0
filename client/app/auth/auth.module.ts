import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule, UiModule } from '@core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthRouting } from './auth.routing';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [ForgotComponent, LoginComponent, ResetComponent],
  imports: [AuthRouting, FormsModule, LayoutModule, ReactiveFormsModule, UiModule, TranslateModule],
})
export class AuthModule {}