import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedLayoutComponent } from './shared-layout/shared-layout.component';
import { ScrollButtonsComponent } from './scroll-buttons/scroll-buttons.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MaterialModule } from '../material.module';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';
import { InfoWindowComponent } from './info-window/info-window.component';


@NgModule({
  declarations: [HeaderComponent, MainPageComponent, SharedLayoutComponent, ScrollButtonsComponent, ErrorMessageComponent, DialogWindowComponent, InfoWindowComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
  ],
  exports: [HeaderComponent, ScrollButtonsComponent],
})
export class SharedModule { }
