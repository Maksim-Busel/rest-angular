import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificateService } from './certificate.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CertificateLayoutComponent } from './certificate-layout/certificate-layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddComponent, EditComponent, DetailsComponent, ListComponent, DashboardComponent, CertificateLayoutComponent],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [ListComponent],
  providers: [CertificateService]
})

export class CertificatesModule { }
