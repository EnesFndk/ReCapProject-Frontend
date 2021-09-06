import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorComponent } from './components/color/color.component';

const routes: Routes = [
{path:"", pathMatch:"full", component:CardetailComponent},
{path:"cardetails",  component:CardetailComponent},
{path:"brands", component:BrandComponent},
{path:"colors", component:ColorComponent},
{path:"cardetails/brands/:brandId", component:CardetailComponent},
{path:"cardetails/colors/:colorId", component:CardetailComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
