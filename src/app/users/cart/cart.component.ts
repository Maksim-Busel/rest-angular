import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/orders/order.service';
import { Certificate, Order } from 'src/app/shared/interfaces';
import { UtilsService } from 'src/app/shared/utils.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  certificates: Certificate[];
  private submitted = false;
  totalPrice = 0;

  constructor(private utilsService: UtilsService, private orderService: OrderService, public dialog: MatDialog) { }

  ngOnInit(): void {    
    this.getCertificatesFromStorage();        
  }

  removeFromCart(certificate: Certificate, id){
    this.utilsService.removeFromCart(certificate)
    this.getCertificatesFromStorage();
  }

  clearCart(){
    this.utilsService.clearCart();
    this.certificates = JSON.parse(sessionStorage.getItem('cart'));
  }

  countTotalPrice(): void{        
    this.totalPrice = this.utilsService.countTotalPrice(this.certificates);
  }

  getCertificatesFromStorage(){
    const certificatesFromStorage: Certificate[] = JSON.parse(sessionStorage.getItem('cart'));
        
    if(certificatesFromStorage){      
      this.certificates = certificatesFromStorage;
      this.countTotalPrice();
    } 
  }

  buy(){
    if(this.submitted){
      return;
    }

    this.submitted = true;
    const savedUserId = localStorage.getItem('userId');

    const order: Order = {
    userId: Number.parseInt(savedUserId),
    priceTotal: this.totalPrice,
    certificatesId: this.getArrayCertificatesId()
    }

    this.orderService.create(order, savedUserId).subscribe(() => {
      this.submitted = false;
      this.clearCart();
      this.showInfoResultOperation();
    }, () => this.submitted = false);
  }

  private getArrayCertificatesId(): number[]{
    let certificatesId: number[] = [];
    for(let certificate of this.certificates){
      certificatesId.push(certificate.id);
    }

    return certificatesId;
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Purchase',
      text: `Do you want to purchase all?`,
      btnTrue: `Buy`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buy();
      }
    });
  }

  public openClearDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Clear cart',
      text: `Do you want to clear cart?`,
      btnTrue: `Clear`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clearCart();
      }
    });
  }

  private showInfoResultOperation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Purchase',
      text: `Purchase completed`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
