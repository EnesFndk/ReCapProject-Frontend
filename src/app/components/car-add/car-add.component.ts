import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandservice/brand.service';
import { CardetailService } from 'src/app/services/cardetailservice/cardetail.service';
import { ColorService } from 'src/app/services/colorservice/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;

  brands:Brand[] = []
  colors:Color[] = []
  
  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private colorService:ColorService, private cardetailService:CardetailService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      carName:["", Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["", Validators.required],
      description:["", Validators.required],
      colorId:["", Validators.required],
      brandId:["", Validators.required]
    })
  }

  carsadd() {
    if(this.carAddForm.valid) {
      let brandId = parseInt(this.carAddForm.value.brandId)
      let colorId = parseInt(this.carAddForm.value.colorId)
      let carModel = Object.assign({}, this.carAddForm.value)
      carModel.brandId = brandId
      carModel.colorId = colorId
      this.cardetailService.add(carModel).subscribe(response =>{
        console.log(response)
        this.toastrService.success(response.message, "Başarılı")
      },responseError=> {
        console.log(responseError.error)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage ,"İşlem Başarısız")
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
    })
  }
}
