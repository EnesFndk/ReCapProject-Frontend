import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brandservice/brand.service';
import { ColorService } from 'src/app/services/colorservice/color.service';
import { LocalService } from 'src/app/services/localservice/local.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthorizated = false
  
  userDetails: UserDetail
  brands: Brand[]
  colors: Color[]

  constructor(private brandService: BrandService, private colorService: ColorService, private localService: LocalService, private router: Router, private toastrService: ToastrService,private authService: AuthService) { }

  ngOnInit(): void {
    this.checkIsAuthorizated()
    this.getUserDetails()
    this.getBrands()
    this.getColors()
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
    })
  }

  getUserDetails() {
    this.userDetails = JSON.parse(this.localService.getItem("user_details") || '')
  }

  checkIsAuthorizated() {
    if (this.localService.getItem("token")) {
      this.isAuthorizated = true
    } else {
      this.isAuthorizated = false
    }
  }

  logOut() {
    this.localService.delete("token")
    this.localService.delete("user_details")
    this.toastrService.info("Çıkış yapıldı.", "Bilgilendirme!")
    this.router.navigate(["login"])
    window.location.reload()
  }
}
