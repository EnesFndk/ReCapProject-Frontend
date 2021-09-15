import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandservice/brand.service';
import { CardetailService } from 'src/app/services/cardetailservice/cardetail.service';
import { ColorService } from 'src/app/services/colorservice/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  
  brands:Brand[]=[]
  colors:Color[]=[]
  cardetails:CarDetail[]=[]
  cardetail:CarDetail;
  carId:number;
  carName:string;
  brandId:number;
  colorId:number;
  modelYear:number;
  dailyPrice:number;
  description:string

  constructor(private formBuilder:FormBuilder,private cardetailService:CardetailService,private brandService:BrandService,private colorService:ColorService,private toastrService:ToastrService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]) {
        this.getCarsById(params["carId"])
        this.createCarForm();
        this.getBrands();
        this.getColors();
      }
    })
  }

  getCarsById(carId:number){
    this.cardetailService.getCarsById(this.activatedRoute.snapshot.params["carId"]).subscribe(response =>{
      this.cardetail = response.data;
        this.carId = this.cardetail.carId
        this.carName = this.cardetail.carName
        this.brandId = this.cardetail.brandId
        this.colorId = this.cardetail.colorId
        this.modelYear = this.cardetail.modelYear
        this.dailyPrice = this.cardetail.dailyPrice
        this.description = this.cardetail.description
    })
  }

  createCarForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:["",Validators.required],
      brandId: ["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear: ["",Validators.required],
      dailyPrice: ["",Validators.required],
      description: ["",Validators.required],
    })
  }

  update(){
    if(this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.cardetailService.update(carModel).subscribe(response =>{
        this.toastrService.success("Araç Güncellendi" , "Başarılı")
        this.back();
      },responseError=> {
        this.toastrService.error(responseError.error.Errors.ErrorMessage, "Doğrulama Hatası")
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }
  back(){
    this.router.navigate(["cardetails"])
  }
}
