
import { HttpErrorResponse } from '@angular/common/http';
import{Action} from '@ngrx/store';
import {paymentmodel} from '../../model/payment.model'

export enum PayActionType{

    PAY ='[paynow]pay',
    PAY_SUCCEES ='[paynow]Login success',
    PAY_FAILURE ='[paynow]Login failed',
    GET_PAYMENT_LOANDING ='[paynow]getpayment loading',
    GET_PAYMENT_SUCCESS='[paynow]getpayment success',
    GET_PAYMENT_FAILURE = '[paynow]getpayment failure'
}

export class getpaymentloading implements Action{
    readonly type = PayActionType.GET_PAYMENT_LOANDING
    constructor(){}
}

export class getpaymentsuccess implements Action{
    readonly type = PayActionType.GET_PAYMENT_SUCCESS
    constructor(public payload:paymentmodel[]){}
}

export class getpaymentfailure implements Action{
    readonly type = PayActionType.GET_PAYMENT_FAILURE
    constructor(public payload:HttpErrorResponse){}
}
export class payclick implements Action{
  readonly type = PayActionType.PAY
constructor(public payload:paymentmodel){}

}

export class paysuccess implements Action{
    readonly type = PayActionType.PAY_SUCCEES
    constructor( public payload:any){}
}

export class payfailure implements Action{
    readonly type = PayActionType.PAY_FAILURE
    constructor(public payload: HttpErrorResponse){}
}

export type PaymentAction = |payclick|paysuccess|payfailure|getpaymentfailure|getpaymentloading|getpaymentsuccess