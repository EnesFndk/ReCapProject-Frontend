import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorservice/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm : FormGroup;
  colors:Color[]=[];
  color:Color;
  colorId:number;
  colorName:string;

  constructor(private colorService:ColorService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.colorId = params["colorId"]
      this.getByColorId(params["colorId"])
      this.createColorForm();
    })
  }

  getByColorId(colorId:number){
    this.colorService.getByColorId(colorId).subscribe(response =>{
      this.color = response.data
      this.colorId = this.color.colorId
      this.colorName = this.color.colorName
    })
  }

  createColorForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(response => {
        this.toastrService.success("Marka silindi" , "Başarılı")
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
