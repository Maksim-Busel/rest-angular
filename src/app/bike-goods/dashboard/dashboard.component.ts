import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BikeGoods } from 'src/app/shared/interfaces';
import { BikeGoodsService } from '../bike-goods.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  bikeGoods: BikeGoods[];
  bikeGoodsSub: Subscription;
  removeSub: Subscription;
  private currentPage = 1;
  private pageSize = 50;

  constructor(private bikeGoodsService: BikeGoodsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bikeGoodsSub = this.bikeGoodsService.getAll().subscribe(
      data => this.bikeGoods = data._embedded.bikeGoodsDtoList
    );
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
    this.bikeGoodsService.getAll(++this.currentPage, this.pageSize).subscribe(data => {
      this.bikeGoods = this.bikeGoods.concat(data._embedded.bikeGoodsDtoList)
    });
  }

  ngOnDestroy(): void{
    if (this.bikeGoodsSub){
      this.bikeGoodsSub.unsubscribe();
    }
    if(this.removeSub){
      this.removeSub.unsubscribe();
    }
  }

  remove(id: number): void {
    this.bikeGoodsService.remove(id).subscribe( () => {
      this.bikeGoods = this.bikeGoods.filter(goods => goods.id !== id);
      this.showInfoResultOperation();
    });
  }

  public openDialog(id): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete bike goods',
      text: `Do you want to delete this bike goods?`,
      btnTrue: `Delete`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(id);
      }
    });
  }

  private showInfoResultOperation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete bike goods',
      text: `The bike goods was deleted.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}

