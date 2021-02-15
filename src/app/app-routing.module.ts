import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PaynowComponent } from './component/paynow/paynow.component';



const routes: Routes = [
//////// identity route ----------------
{path:'payment', component:PaynowComponent},
{path:'', component:HomeComponent},
 { path : '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
