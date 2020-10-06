import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BikeGoods } from 'src/app/shared/interfaces';
import { BikeGoodsService } from '../bike-goods.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  bikeGoods: BikeGoods[];
  goodsSub: Subscription;
  private currentPage = 1;
  private pageSize = 50;

  constructor(private bikeGoodsService: BikeGoodsService) {}

  ngOnInit(): void {
    this.goodsSub =this.bikeGoodsService.getAll().subscribe(data => this.bikeGoods = data._embedded.bikeGoodsDtoList);
  }

  ngOnDestroy(){
    if (this.goodsSub){
      this.goodsSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    document.addEventListener('scroll', this.loadBikeGoodsByScroll.bind(this));
  }

  public loadBikeGoodsByScroll(): void{
    if(window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight){
      this.loadBikeGoods();
  }
  }

  loadBikeGoods(): void{
    this.goodsSub = this.bikeGoodsService.getAll(++this.currentPage, this.pageSize).subscribe(data => {
      this.bikeGoods = this.bikeGoods.concat(data._embedded.bikeGoodsDtoList)
    });
  }
}
