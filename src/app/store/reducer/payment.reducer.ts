import {paymentmodel}  from '../../model/payment.model'
import { PayActionType, PaymentAction } from '../action/payment.action'
export interface IPaymentState{

    getpaymentsuccess:boolean;
    getpaymentloading:boolean;
    getpaymentfailure:boolean;
    loading:boolean;
    paysuccess:boolean;
    payfailure:boolean;
    data:string;
    errormessage:string;
    paymentrecord:paymentmodel[];
}

export const INITIAL_STATE:IPaymentState ={
    loading:false,
    paysuccess:false,
    payfailure:false,
    data:null,
    errormessage:null,
    paymentrecord:null,
    getpaymentfailure:false,
    getpaymentloading:false,
    getpaymentsuccess:false
    
}

export function PaymentReducer( state = INITIAL_STATE, action:PaymentAction){

  switch(action.type){


    case PayActionType.GET_PAYMENT_LOANDING:{

        return{
            ...state,
            getpaymentloading:true,
        }

    }

    case PayActionType.GET_PAYMENT_FAILURE:{
        return{
            ...state,
            getpaymentloading:false,
            getpaymentfailure:true
        }
    }

    case PayActionType.GET_PAYMENT_SUCCESS:{

        return{
            ...state,
            getpaymentloading:false,
            getpaymentsuccess:true,
            paymentrecord: action.payload
        }
    }

    case PayActionType.PAY:{
        return{
            ...state,
            loading:true,
            errormessage:null
        }
    }

    case PayActionType.PAY_SUCCEES:{
        return{
            ...state,
             loading :false,
             errormessage:null,
             paysuccess:true,
             data:action.payload
        }
    }

    case PayActionType.PAY_FAILURE:{
        return{
            ...state,
            loading:false,
            payfailure:true,
            errormessage:action.payload
        }
    }

  default:
      { return state;}

  }

}
