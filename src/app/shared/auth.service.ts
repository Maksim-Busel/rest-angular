import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  login(user){    
    return this.http.post('http://localhost:8080/auth/login', user)
    .pipe(
      tap(this.saveToken)
    );
  }

  logout(): void{
    this.saveToken(null);
  }

  private saveToken(response): void {
    if (response){      
      const token = response.token;
      localStorage.setItem('token', token);
      
      const userId = response.userId;
      localStorage.setItem('userId', userId);

      const roles = response.roles;
      let rolesString = '';
      const length = roles.length;
      for (let i = 0; i < length; i++){
        rolesString += roles[i].name;
      }
      localStorage.setItem('roles', rolesString.replace('ROLE_', '').toLowerCase());
    } else {
      localStorage.clear();
    }
  }

  // tslint:disable-next-line:typedef
  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean{
    return !!this.getToken();
  }

  isAdmin(): boolean{
    const roles: string = localStorage.getItem('roles');
    const admin = 'admin';
    if (roles != null){
      return roles.includes(admin);
    }

    return false;
  }
}
