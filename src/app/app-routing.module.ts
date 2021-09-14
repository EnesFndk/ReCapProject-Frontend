import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';


const routes: Routes = [
{path:"", pathMatch:"full", component:CardetailComponent},
{path:"cardetails",  component:CardetailComponent},
{path:"brands", component:BrandComponent},
{path:"colors", component:ColorComponent},
{path:"rentals", component:RentalComponent},
{path:"cardetails/brands/:brandId", component:CardetailComponent},
{path:"cardetails/colors/:colorId", component:CardetailComponent},
{path:"cardetails/car/:carId", component:CarComponent},
{path :"cardetails/rent/:rental" , component : PaymentComponent},
{path:"cars/add", component:CarAddComponent},
{path:"brands/add", component:BrandAddComponent},
{path:"colors/add", component:ColorAddComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
