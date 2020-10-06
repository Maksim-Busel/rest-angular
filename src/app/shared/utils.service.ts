import { Injectable } from '@angular/core';
import { Certificate } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  certificates: Certificate[] = [];

  constructor() { }

  ngOnInit(): void {
    const certificatesFromStorage: Certificate[] = JSON.parse(sessionStorage.getItem('cart'));
    if(certificatesFromStorage){
      this.certificates = certificatesFromStorage;
    } 
  }

  savePositionInLocalStorage(){
      localStorage.isClicked = true;
      localStorage.scrollLeft = window.pageXOffset;
      localStorage.scrollTop = window.pageYOffset;
  }

  addToCart(certificate: Certificate){
    this.certificates.push(certificate);
    sessionStorage.setItem('cart', JSON.stringify(this.certificates));
  }

  removeFromCart(certificate: Certificate){
    const indexCertificate = this.certificates.indexOf(certificate);
    this.certificates.splice(indexCertificate, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.certificates));
  }

  clearCart(){
    this.certificates = [];
    sessionStorage.clear();
  }

  countTotalPrice(certificates: Certificate[]): number{
    let sum = 0;
    const orderLength = certificates.length
    for(let i = 0; i < orderLength; i++){
      sum += certificates[i].price;
    }
    
    return sum;
  }
}
