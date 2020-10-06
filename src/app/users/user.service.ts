import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, User } from '../shared/interfaces';

@Injectable()
export class UserService {
  private url = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  create(user: User){
    return this.http.post(`${this.url}/registration`, user);
  }

  getAll(pageNumber: number = 1, pageSize: number = 50): Observable<any> {
    return this.http.get<any>(`${this.url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // tslint:disable-next-line:typedef
  remove(id){
    return this.http.delete(`${this.url}/${id}`);
  }

  // tslint:disable-next-line:typedef
  update(user: User){
    return this.http.put(`${this.url}/${user.id}`, user);
  }

  getUserOrders(id: number, pageNumber: number = 1, pageSize: number = 50): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  countTotalPrice(orders: Order[]): number{
    let sum = 0;
    const orderLength = orders.length
    for(let i = 0; i < orderLength; i++){
      sum += orders[i].priceTotal;
    }
    
    return sum;
  }
}
