import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from 'src/app/models/listResponseModel';

import { CarImage } from 'src/app/models/carImage';
import { CarDetail } from 'src/app/models/cardetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'http://localhost:49454/api/'

  constructor(private httpClient: HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + 'cars/getallbydetails'
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + 'carimages/getbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarDetailPage(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+ 'cars/getcardetailpagebyid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  
}
