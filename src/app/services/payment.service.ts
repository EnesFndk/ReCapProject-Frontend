import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "http://localhost:49454/api/";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "payments/add"
    return this.httpClient.post<ResponseModel>(apiUrl, payment)
  }
}
