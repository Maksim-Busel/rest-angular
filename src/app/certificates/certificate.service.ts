import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certificate } from '../shared/interfaces';
import { Observable } from 'rxjs';


@Injectable()
export class CertificateService {
  private url = 'http://localhost:8080/certificates';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  create(certificate: Certificate){
    return this.http.post(this.url, certificate);
  }

  getAll(pageNumber: number = 1, pageSize: number = 50, search = 'certificate'): Observable<any> {
    const emptyString = '';
    if(search === emptyString){
      search = 'certificate'
    }

    return this.http.get<any>(`${this.url}/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&searchBy=name=${search}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // tslint:disable-next-line:typedef
  remove(id){
    return this.http.delete(`${this.url}/${id}`);
  }

  // tslint:disable-next-line:typedef
  update(certificate: Certificate){
    return this.http.patch(`${this.url}/${certificate.id}`, certificate);
  }
}
