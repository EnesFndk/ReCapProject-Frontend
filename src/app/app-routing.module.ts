import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { LoginComponent } from './components/login/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';


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

{path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
{path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
{path:"colors/add", component:ColorAddComponent, canActivate:[LoginGuard]},

{path:"cars/list/add",component:CarAddComponent, canActivate:[LoginGuard]},
{path:"cars/list/update/:carId",component:CarUpdateComponent, canActivate:[LoginGuard]},
{path:"cars/list/delete/:carId",component:CarDeleteComponent, canActivate:[LoginGuard]},
{path:"cars/list",component:CarListComponent},


{path:"colors/list",component:ColorListComponent},
{path:"colors/list/add",component:ColorListComponent, canActivate:[LoginGuard]},
{path:"colors/list/update/:colorId",component:ColorUpdateComponent, canActivate:[LoginGuard]},
{path:"colors/list/delete/:colorId",component:ColorDeleteComponent, canActivate:[LoginGuard]},

{path:"brands/list",component:BrandListComponent},
{path:"brands/list/add",component:BrandAddComponent, canActivate:[LoginGuard]},
{path:"brands/list/update/:brandId",component:BrandUpdateComponent, canActivate:[LoginGuard]},
{path:"brands/list/delete/:brandId",component:BrandDeleteComponent, canActivate:[LoginGuard]},

{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
