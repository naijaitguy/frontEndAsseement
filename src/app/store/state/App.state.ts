import { createFeatureSelector , createSelector} from '@ngrx/store';

import {IPaymentState}  from '../reducer/payment.reducer';

const getPaymentState = createFeatureSelector<IPaymentState>('payment')

export const paymentstate = createSelector(getPaymentState,(state:IPaymentState)=>{
    return state;

}

)

export const Paymentrecord = createSelector(getPaymentState,(state:IPaymentState)=>{
    const records  = state.paymentrecord;
    return {...state, record:records};
})