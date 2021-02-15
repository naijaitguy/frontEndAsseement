import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PaynowComponent } from './component/paynow/paynow.component';
import { PaymentService } from './services/payment.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PaymentEffect } from './store/effect/payment.effect';
import { PaymentReducer } from './store/reducer/payment.reducer';
import { NgxSpinnerModule} from 'ngx-spinner';
import { fakeBackendProvider } from './_Helper/fakebackend';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PaynowComponent,
    HomeComponent,
   
  ],
  imports: [
    BrowserModule,
   AppRoutingModule,
   ReactiveFormsModule,
   HttpClientModule,
   NgxSpinnerModule,
   BrowserAnimationsModule, // required animations module
   ToastrModule.forRoot(),

   StoreModule.forRoot({payment:PaymentReducer}),
   EffectsModule.forRoot([PaymentEffect])
   
  ],
  providers: [ // provider used to create fake backend
     fakeBackendProvider ],
  bootstrap: [AppComponent]
})
export class AppModule { }
