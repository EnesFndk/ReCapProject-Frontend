import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';


const routes: Routes = [
{path:"", pathMatch:"full", component:CardetailComponent},
{path:"cardetails",  component:CardetailComponent},
{path:"brands", component:CardetailComponent},
{path:"colors", component:CardetailComponent},
{path:"cardetails/brands/:brandId", component:CardetailComponent},
{path:"cardetails/colors/:colorId", component:CardetailComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
