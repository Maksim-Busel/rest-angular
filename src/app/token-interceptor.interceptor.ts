import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();

    if (authService.isAuthenticated()){
      const requestWithToken = req.clone({
        setHeaders: {
          Authorization: `Bearer_${token}`
        }
      });

      return next.handle(requestWithToken)
      .pipe(
        catchError( error => {
          if (error.status === 403 || error.status === 401){
            authService.logout();
            this.router.navigate(['/users', 'login']);
          }

          return throwError(error);
        })
      );
    } else {
      return next.handle(req)
    }
  }

  // constructor(private authService: AuthService) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.authService.getToken();

  //   if (token){
  //     const request = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer_${token}`
  //       }
  //     });

  //     return next.handle(request);
  //   }
    
  //   return next.handle(req);   
  // }
}
