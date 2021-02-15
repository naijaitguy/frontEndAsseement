import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { paymentmodel } from 'src/app/model/payment.model';
import { getpaymentloading } from 'src/app/store/action/payment.action';
import { IPaymentState } from 'src/app/store/reducer/payment.reducer';
import { Paymentrecord, paymentstate } from 'src/app/store/state/App.state';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getState:any;

  paymentreocrd: Observable <paymentmodel>[];
  constructor( private store:Store<IPaymentState>, ) { this.getState = this.store.pipe(select(Paymentrecord,)) }

  ngOnInit(): void { 
    
    this.store.dispatch( new getpaymentloading)

    this.getState.subscribe((data)=>{
  
      this.paymentreocrd = data['record']
      console.log(this.paymentreocrd)
    })
  }

}
