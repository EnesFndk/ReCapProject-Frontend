import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerForUpdateDto } from 'src/app/models/customerForUpdateDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ObjectResponseModel } from 'src/app/models/objectResponseModel';
import { ResponseModel } from 'src/app/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'http://localhost:49454/api/'

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getall" 
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }

  getCustomerDetailsById(userId:number):Observable<ObjectResponseModel<CustomerDetail>>{
    let apiUrl = this.apiUrl + "customers/getcustomerdetailsbyid?userId" + userId
    return this.httpClient.get<ObjectResponseModel<CustomerDetail>>(apiUrl)
  }

  update(customerForUpdateDto:CustomerForUpdateDto):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "customers/update"
    return this.httpClient.post<ResponseModel>(apiUrl, customerForUpdateDto)
  }
}
