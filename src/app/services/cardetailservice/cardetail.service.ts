import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailResponseModel } from 'src/app/models/cardetail/cardetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardetailService {
  apiUrl = 'http://localhost:49454/api/cars/getallbydetails'

  constructor(private httpClient: HttpClient) { }

  getCarDetails():Observable<CarDetailResponseModel>{
    return this.httpClient.get<CarDetailResponseModel>(this.apiUrl)
  }
}


