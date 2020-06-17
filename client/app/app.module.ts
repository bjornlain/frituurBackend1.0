import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LayoutModule, UiModule } from '@core';
import { DashboardModule } from '@dashboard';
import { EmployeesModule } from '@employees';
//import { environment } from '@environments';
//import { StoreModule } from '@codious/ngrx-generator';
//import { StoreDevtoolsModule } from '@codious/ngrx-generator';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { AppRouting } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { LayoutRootComponent } from './core/layout/layout-root/layout-root.component';
import { ProjectsModule } from './projects/projects.module';

@NgModule({
  bootstrap: [LayoutRootComponent],
  imports: [
    AppRouting,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    //EffectsModule.forRoot([]),
    HttpClientModule,
    LayoutModule,
    EmployeesModule,
    ProjectsModule,
    RouterModule,
    //StoreModule.forRoot([]),
    //!environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateHttpLoader, deps: [HttpClient] },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),
    UiModule,
  ],
  declarations: [],
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|nl/) ? browserLang : 'en');
  }
}