import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditcard';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = 'http://localhost:49454/api/';

  constructor(private httpClient:HttpClient) { }

  getCreditCards():Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcard/getall";
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
  
  addCreditCar(creditCard:CreditCard):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "creditCard/add"
    return this.httpClient.post<ResponseModel>(apiUrl , creditCard)
  }
}
