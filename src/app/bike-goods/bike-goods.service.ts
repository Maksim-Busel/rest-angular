import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BikeGoods } from '../shared/interfaces';

@Injectable()
export class BikeGoodsService {
  private url = 'http://localhost:8080/bike-goods';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  create(bikeGoods: BikeGoods){
    return this.http.post(this.url, bikeGoods);
  }

  getAll(pageNumber: number = 1, pageSize: number = 50): Observable<any> {
    return this.http.get<any>(`${this.url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // tslint:disable-next-line:typedef
  remove(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  // tslint:disable-next-line:typedef
  update(bikeGoods: BikeGoods){
    return this.http.put(`${this.url}/${bikeGoods.id}`, bikeGoods);
  }
}
