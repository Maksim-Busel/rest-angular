import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../shared/auth.guard';
import { AuthUserGuard } from '../shared/auth-user.guard';
import { BikeGoodsLauoutComponent } from './bike-goods-lauout/bike-goods-lauout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const bikeGoodsRoutes: Routes = [
    {path: '', component: BikeGoodsLauoutComponent, children: [
        {path: 'bike-goods', component: ListComponent, canActivate: [AuthUserGuard]},
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
        {path: 'add', component: AddComponent, canActivate: [AuthGuard]},
        {path: 'bike-goods/:id/edit', component: EditComponent, canActivate: [AuthGuard]},
        {path: ':id', component: DetailsComponent, canActivate: [AuthUserGuard]},
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(bikeGoodsRoutes)],
    exports: [RouterModule]
  })
  export class BikeGoodsRoutingModule { }
