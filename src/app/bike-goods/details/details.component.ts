import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeGoods } from 'src/app/shared/interfaces';
import { BikeGoodsService } from '../bike-goods.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  bikeGoods: BikeGoods;

  constructor(private bikeGoodsService: BikeGoodsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const bikeGoodsId = this.route.params['_value']['id'];
    this.bikeGoodsService.getById(bikeGoodsId).subscribe(goods => this.bikeGoods = goods);
  }

}
