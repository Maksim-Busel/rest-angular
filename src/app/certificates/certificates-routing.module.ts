import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CertificateLayoutComponent } from './certificate-layout/certificate-layout.component';
import { AuthGuard } from '../shared/auth.guard';

const certificateRoutes: Routes = [
    {path: '', component: CertificateLayoutComponent, children: [
        {path: 'list', component: ListComponent},
        {path: 'add', component: AddComponent, canActivate: [AuthGuard]},
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
        {path: 'certificate/:id/edit', component: EditComponent, canActivate: [AuthGuard]},
        {path: 'certificate/:id', component: DetailsComponent},
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(certificateRoutes)],
    exports: [RouterModule]
  })
  export class CertificatesRoutingModule { }
