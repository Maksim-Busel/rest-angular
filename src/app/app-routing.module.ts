import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificatesModule } from './certificates/certificates.module';
import { BikeGoodsModule } from './bike-goods/bike-goods.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { SharedModule } from './shared/shared.module';


const routes: Routes = [
    {path: '', redirectTo: '/certificates/list', pathMatch: 'full'},
    {path: 'certificates', loadChildren: () => CertificatesModule},
    {path: 'users', loadChildren: () => UsersModule},
    {path: 'orders', loadChildren: () => OrdersModule},
    {path: 'bike-goods', loadChildren: () => BikeGoodsModule},
    {path: '**', redirectTo: '/certificates/list'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CertificatesModule,
    BikeGoodsModule,
    UsersModule,
    OrdersModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
