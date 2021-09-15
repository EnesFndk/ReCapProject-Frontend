import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandservice/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  brandDeleteForm: FormGroup;
  brand:Brand;
  brands:Brand[]=[];
  brandId:number;
  brandName:string;
  
  constructor(private brandService:BrandService, private activatedRoute:ActivatedRoute, private router:Router, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.brandId = params["brandId"]
        this.getByBrandId(this.brandId)
        this.createBrandForm();
      
    })
  }

  getByBrandId(brandId:number) {
    this.brandService.getByBrandId(brandId).subscribe(response =>{
      this.brand = response.data
      this.brandId = this.brand.brandId
      this.brandName = this.brand.brandName
    })
  }

  createBrandForm(){
    this.brandDeleteForm = this.formBuilder.group({
      brandId:["",Validators.required]
    });
  }

  delete(){
    if(this.brandDeleteForm.valid){
      let brandModel = Object.assign({}, this.brandDeleteForm.value);
      this.brandService.delete(brandModel).subscribe(response =>{
        this.toastrService.success("Marka silindi", "Başarılı")
        this.backToBrandList();
      },responseError=> {
        this.toastrService.error(responseError.error.Errors.ErrorMessage, "Doğrulama Hatası")
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
  }

  backToBrandList(){
    this.router.navigate(["brands/list"]);
  }
}
