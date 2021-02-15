import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let payments = JSON.parse(localStorage.getItem('paynebt')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
            
                case url.endsWith('/processpayment') && method === 'POST':
                    return pay();
                case url.endsWith('/getpayment') && method === 'GET':
                    return getpayment();
                
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions


        function pay() {
            const data = body

          
           // data.id = data.length ? Math.max(...data.map(x => x.id)) + 1 : 1;
            payments.push(data);
            localStorage.setItem('paynebt', JSON.stringify(payments));
            return ok();
        }

        function getpayment() {
           
            return ok(payments);
        }

        function getpaymentById() {
          

            const payment = payments.find(x => x.id === idFromUrl());
            return ok(payment);
        }

     

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

