import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType, createEffect, } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { PaymentService } from "src/app/services/payment.service";
import { getpaymentfailure, getpaymentloading, getpaymentsuccess, PayActionType, payclick, payfailure, paysuccess } from "../action/payment.action";
import { catchError,exhaustMap,map, mergeMap, switchMap, tap,} from 'rxjs/operators';
import { paymentmodel } from "src/app/model/payment.model";



@Injectable()

export class PaymentEffect {

    constructor( private Paymentservices:PaymentService, private action$:Actions, private route:Router ){}

    @Effect()

    paynow$:Observable<any> = this.action$.pipe(
       ofType(PayActionType.PAY),
       exhaustMap((action:payclick)=> this.Paymentservices.processpayment(action.payload)
       .pipe(
           map(data=>{  return new paysuccess(data)}),
           catchError(error=> {  return of( new payfailure(error)) })
       ))
    );

    @Effect({dispatch:false})
    paysuccess$ = this.action$.pipe(
        ofType(PayActionType.PAY_SUCCEES),tap((data)=>{ })
    )

    @Effect({dispatch:false})
    payfailure$ = this.action$.pipe(
        ofType(PayActionType.PAY_FAILURE), tap((error)=>{ })
    )


    @Effect()
    getpaymentloading$ = this.action$.pipe(
        ofType(PayActionType.GET_PAYMENT_LOANDING),
        mergeMap((action:getpaymentloading)=> this.Paymentservices.getpaymentrecord().pipe(
            map( (data:paymentmodel[])=>{

                return new getpaymentsuccess(data)
            }),
            catchError((error)=>{ return of(new getpaymentfailure(error))})
        ))
    );

    @Effect({dispatch:false})
    getpaymentfailure$ = this.action$.pipe(
        ofType(PayActionType.GET_PAYMENT_FAILURE), tap((error)=>{ })
    )

    @Effect({dispatch:false})
    getpaymentsuccess$ = this.action$.pipe(
        ofType(PayActionType.GET_PAYMENT_SUCCESS),tap((data)=>{ })
    )

    //login$ = createEffect(
    //    () =>
    //      this.action$.pipe(
      //      ofType(fromAuthActions.login),
     //       switchMap(() => this.authService.doLogin())
     //     ),
     //   { dispatch: false }
     // );

}