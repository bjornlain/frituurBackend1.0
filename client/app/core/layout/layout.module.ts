import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LayoutPlainComponent } from './layout-plain/layout-plain.component';
import { LayoutRootComponent } from './layout-root/layout-root.component';

@NgModule({
  declarations: [LayoutMainComponent, LayoutPlainComponent, LayoutRootComponent],
  exports: [LayoutMainComponent, LayoutPlainComponent, LayoutRootComponent],
  imports: [CommonModule, RouterModule, UiModule],
})
export class LayoutModule {}
