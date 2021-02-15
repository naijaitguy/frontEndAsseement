import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { paymentmodel } from '../model/payment.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor( private Http:HttpClient) { }


  processpayment( payload:{ cardnumber:string; cardholder:string;  expirationdate:Date;  securitycode:string;   amount:number;  }):Observable<any>{

    return this.Http.post<any>(environment.ApiEndpoin + '/processpayment', payload);

  }

  getpaymentrecord():Observable<paymentmodel[]>{

   return this.Http.get<any>(environment.ApiEndpoin + '/getpayment');
  }

}
