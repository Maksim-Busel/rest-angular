import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { BikeGoodsRoutingModule } from './bikeGoods-routing.module';
import { BikeGoodsLauoutComponent } from './bike-goods-lauout/bike-goods-lauout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BikeGoodsService } from './bike-goods.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, DetailsComponent, BikeGoodsLauoutComponent, DashboardComponent],
  imports: [
    CommonModule,
    BikeGoodsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [BikeGoodsService]
})
export class BikeGoodsModule { }
