import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { ListComponent } from './list/list.component';
import { OrderLayoutComponent } from './order-layout/order-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ListComponent, OrderLayoutComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
