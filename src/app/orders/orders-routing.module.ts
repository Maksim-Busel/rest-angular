import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { ListComponent } from './list/list.component';
import { OrderLayoutComponent } from './order-layout/order-layout.component';

const ordersRoutes: Routes = [
  {path: '', component: OrderLayoutComponent, children: [
    {path: 'dashboard', component: ListComponent, canActivate: [AuthGuard]},
]}
];

@NgModule({
    imports: [RouterModule.forChild(ordersRoutes)],
    exports: [RouterModule]
  })
  export class OrdersRoutingModule { }
