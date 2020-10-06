import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  orders: Order[];
  ordersSub: Subscription;
  userId: number;
  totalPrice = 0;

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activeRoute.params['_value']['id'];
    this.ordersSub = this.userService.getUserOrders(this.userId).subscribe(
      data => {
        this.orders = data._embedded.orderDtoList;
        this.countTotalPrice();
      });
  }

  ngOnDestroy(){
    if(this.ordersSub){
      this.ordersSub.unsubscribe();
    }
  }

  countTotalPrice(): void{        
    this.totalPrice = this.userService.countTotalPrice(this.orders);
  }
}
