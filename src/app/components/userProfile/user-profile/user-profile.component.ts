import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userDetail';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';
import { CustomerService } from 'src/app/services/customerservice/customer.service';
import { LocalService } from 'src/app/services/localservice/local.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { CustomerForUpdateDto } from 'src/app/models/customerForUpdateDto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User
  customer: Customer
  userDetail: UserDetail
  customerDetail: CustomerDetail
  userUpdateForm: FormGroup
  userUpdateModel : User

  constructor(private userService: UserService, private customerService: CustomerService, private localService: LocalService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserByUserId();
  }

  updateUser(){
    let userDetail = JSON.parse(this.localService.getItem("user_details") || '')
    let userUpdateModel : UserForUpdateDto = {
      userId : userDetail.userId,
      firstName : this.userUpdateForm.value.firstName,
      lastName : this.userUpdateForm.value.lastName,
      email : this.userUpdateForm.value.email
    }

    this.userService.update(userUpdateModel).subscribe(response => {
      this.toastrService.success("Kullanıcı güncellendi" , "İşlem Başarılı!")
      this.localService.update("user_details", JSON.stringify(userUpdateModel))
    },responseError => {
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "İşlem Başarısız !!")
        }
      }
    })
    this.updateCustomer()
  }

  updateCustomer(){
    let companyName = this.userUpdateForm.value.companyName
    let customerUpdateModel : CustomerForUpdateDto = {customerId: this.customerDetail.userId, companyName: companyName}
    this.customerService.update(customerUpdateModel).subscribe(response => {
      console.log(response)
      window.location.reload()
    }, responseError => {
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "İşlem başarısız !!")
          
        }
      }
    })
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.userDetail.firstName],
      lastName: [this.userDetail.lastName],
      email: [this.userDetail.email],
      companyName: [this.customerDetail.companyName]
    })
  }

  getUserByUserId(){
    this.userDetail = JSON.parse(localStorage.getItem("user_details") || '');
    this.userService.getUserById(this.userDetail.userId).subscribe(response => {
      console.log(response)
      this.user = response.data
      this.getCustomerDetailsByUserId()
    })
  }

  getCustomerDetailsByUserId(){
    this.customerService.getCustomerDetailsById(this.userDetail.userId).subscribe(response => {
      this.customerDetail = response.data
      this.createUserUpdateForm()
    })
  }
  
}
