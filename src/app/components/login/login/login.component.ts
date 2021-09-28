import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/localservice/local.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userDetail:UserDetail
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService, private localService:LocalService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response =>{
        this.toastrService.info(response.message, "Bilgilendirme")
        this.localService.add("token", response.data.token)
        this.router.navigate(["/cardetails"])
        this.userService.getUserByEmail(this.loginForm.value.email).subscribe(response => {
          this.userDetail = response.data
          this.localService.add("user_details", JSON.stringify(this.userDetail))
          window.localStorage.reload()
        })
      },responseError => {
        this.toastrService.error(responseError.error)
      })
    }else {
      this.toastrService.error("Form bilgileri eksik." , "İşlem başarısız!")
    }
  }

}
