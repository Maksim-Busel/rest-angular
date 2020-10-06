import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces';
import { OrderService } from '../order.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  orders: Order[];
  ordersSub: Subscription;
  removeSub: Subscription;
  userId: number;
  private currentPage = 1;
  private pageSize = 50;

  constructor(private orderService: OrderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(
      data => {
        this.orders = data._embedded.orderDtoList;
      });
  }

  ngOnDestroy(){
    if(this.ordersSub){
      this.ordersSub.unsubscribe();
    }

    if(this.removeSub){
      this.removeSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    document.addEventListener('scroll', this.loadOrdersByScroll.bind(this));
  }

  public loadOrdersByScroll(): void{
    if(window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight){
      this.loadOrders();
  }
  }

  loadOrders(): void{
    this.ordersSub = this.orderService.getAll(++this.currentPage, this.pageSize).subscribe(data => {
      this.orders = this.orders.concat(data._embedded.orderDtoList)
    });
  }

  remove(orderId){
    this.removeSub = this.orderService.remove(orderId).subscribe( () => {
      this.orders = this.orders.filter(order => order.id !== orderId);
      this.showInfoResultOperation();
    });
  }

  public openDialog(id): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete order',
      text: `Do you want to delete this order?`,
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
      title: 'Delete order',
      text: `The order was deleted.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
