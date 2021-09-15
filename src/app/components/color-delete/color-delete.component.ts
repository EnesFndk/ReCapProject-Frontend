import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorservice/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {
  
  colorDeleteForm :FormGroup;
  color:Color;
  colorId:number;
  colorName:string

  constructor(private colorService:ColorService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.colorId = params["colorId"]
      this.getByColorId(params["colorId"])
      this.createColorForm();
    })
  }

  getByColorId(colorId:number) {
    this.colorService.getByColorId(this.colorId).subscribe(response => {
      this.color = response.data
      this.colorId = this.color.colorId
      this.colorName = this.color.colorName
    })
  }

  createColorForm(){
    this.colorDeleteForm = this.formBuilder.group({
      colorId:["",Validators.required]
    })
  }

  delete(){
    if(this.colorDeleteForm.valid){
      let colorModel = Object.assign({}, this.colorDeleteForm.value);
      this.colorService.delete(colorModel).subscribe(response =>{
        this.toastrService.success("Marka silindi", "Başarılı")
        this.backToColorList();
      },responseError=> {
        this.toastrService.error(responseError.error.Errors.ErrorMessage, "Doğrulama Hatası")
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
  }

  backToColorList(){
    this.router.navigate(["colors/list"]);
  }
  
}
