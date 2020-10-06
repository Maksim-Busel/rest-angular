import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  create(order: Order, userId){
    return this.http.post(`${this.url}/user/${userId}`, order);
  }

  getAll(pageNumber: number = 1, pageSize: number = 50): Observable<any> {
    return this.http.get<any>(`${this.url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  // tslint:disable-next-line:typedef
  remove(id){
    return this.http.delete(`${this.url}/${id}`);
  }
}
