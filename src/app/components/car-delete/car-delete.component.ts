import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetailservice/cardetail.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  carDeleteForm: FormGroup;
  
  cardetail: CarDetail;
  cardetails:CarDetail[]=[];
  carId:number;

  constructor(private cardetailService:CardetailService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {   
        this.carId = params["carId"];
        this.getCarsById(this.carId)
        this.createCarForm();
     
    })
  }

  getCarsById(carId:number) {
    this.cardetailService.getCarsById(carId).subscribe(response =>{    
      this.cardetail = response.data
      this.carId = this.cardetail.carId
    })
  }
  
  createCarForm(){
    this.carDeleteForm = this.formBuilder.group({
      carId:["", Validators.required]
    })
  }
  

  delete(){
    if(this.carDeleteForm.valid) {
      let carModel = Object.assign({}, this.carDeleteForm.value)
      this.cardetailService.delete(carModel).subscribe(response =>{
        this.toastrService.success("Araç Silindi", "İşlem Başarılı")
        this.back();
      },responseError=> {
        this.toastrService.error(responseError.error.Errors.ErrorMessage, "Doğrulama Hatası")
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
  }

  back(){
    this.router.navigate(["cardetails"]);
  }
}