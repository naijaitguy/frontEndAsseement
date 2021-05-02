import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { PaymentService } from '../services/payment.service';



@Injectable()
export class RequestInterceptor implements HttpInterceptor {
private IsRefreshing = false;
private RefreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private Service: PaymentService ) {

    }



    AddToken(request: HttpRequest<any>, token: string){
        return request.clone({
            setHeaders: {Authorization : `Bearer ${token}`}
        });


    }

   private  Handle401Error(request: HttpRequest<any>, next: HttpHandler){
  if (!this.IsRefreshing){

    this.IsRefreshing = true;
    this.RefreshTokenSubject.next(null);

    return this.Service.RefreshToken(this.Service.getRefreshToken()).pipe(
     switchMap((token: any) => {
           this.IsRefreshing = false;
           this.RefreshTokenSubject.next(token.jwt);
           return next.handle(this.AddToken(request, token.jwt));

        })

    );


   } else{

return this.RefreshTokenSubject.pipe(
filter(token => token != null), take(1), switchMap(jwt => {
    return next.handle(this.AddToken(request, jwt));
})

);

   }



   }




}
