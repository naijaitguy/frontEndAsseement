import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Store ,select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { paymentmodel } from 'src/app/model/payment.model';
import { payclick } from 'src/app/store/action/payment.action';
import { IPaymentState } from 'src/app/store/reducer/payment.reducer';
import { paymentstate } from 'src/app/store/state/App.state';
import { NgxSpinnerService } from "ngx-spinner";  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.component.html',
  styleUrls: ['./paynow.component.css'],
  providers: [DatePipe]
})
export class PaynowComponent implements OnInit {
  FormData: FormGroup;
  ///////////
  numberPattern = '^((\\+91-?)|0)?[0-9]{16}$';
  codepattern='((\\+91-?)|0)?[0-9]{3}$';
  amountpattern= '^[1-9][0-9]*$';
  namepattern= '^[ a-zA-Z ]*$';
  ////
  mydate :Date = new Date;
  expire:boolean = false;
  submitted:boolean = false;
  loading:boolean = false;
  success:boolean= false;
  failure:boolean= false;
  data:string;
  getState: Observable<any>;
  errorMessage: string | null;
  constructor(private FB:FormBuilder,private datePipe: DatePipe,private toastr: ToastrService, private store:Store<IPaymentState>, private spinner:NgxSpinnerService) { 
    
 
    this.getState = this.store.pipe(select(paymentstate,))

    this.FormData = FB.group({ 
      amount:[ '' , Validators.compose([ Validators.required, Validators.pattern(this.amountpattern)])],
      code:[ '' , Validators.compose([ Validators.pattern(this.codepattern)])],
      cardname:[ '' , Validators.compose([ Validators.required, Validators.pattern(this.namepattern)])],
      cardnumber:[ '' , Validators.compose([ Validators.required, Validators.pattern(this.numberPattern)])],
      date:[ '' , Validators.compose([ Validators.required])]
    });

  }


 
  ngOnInit(): void {

    

   
  }
  get f(){  return this.FormData.controls; }
  

  ProcessForm(){
    this.expire = false;
    this.success= false;
    this.failure = false;
    //////////set submit to true when the submit button is clik
  this.submitted = true;

  if(this.FormData.invalid){ return false;}
  else{

    if( this.mydate>  new Date( this.FormData.controls.date.value)){ this.expire = true; return false; }
  const Payload :paymentmodel = this.FormData.value
    //////////////call effect///////////

    this.store.dispatch(new payclick(Payload));
    this.getState.subscribe((state)=>{

     // console.log(state)
      this.loading = state.loading,
      this.success = state.paysuccess,
      this.failure = state.payfailure,
      this.data = state.data
      this.errorMessage = state.errormessage
      state.loading? this.spinner.show():this.spinner.hide()
      state.paysuccess?  this.toastr.success('Approved', 'Payment Successfull'):''
      state.payfailure?  this.toastr.error('Error', 'Payment Not Successful Pls Try Again'):''
    });

    
  }

  }

}
