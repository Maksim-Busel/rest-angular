import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: Order[];
  ordersSub: Subscription;
  totalPrice = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {    
    const userId = localStorage.getItem('userId');
    this.ordersSub = this.userService.getUserOrders(Number.parseInt(userId)).subscribe(  
      data => {
        this.orders = data._embedded.orderDtoList
        this.countTotalPrice();
      }
    );    
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
