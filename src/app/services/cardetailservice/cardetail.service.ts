import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/cardetail';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class CardetailService {
  apiUrl = 'http://localhost:49454/api/'

  constructor(private httpClient: HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + 'cars/getallbydetails'
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + 'cars/getbybrand?id='+ brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + 'cars/getbycolor?id='+ colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  add(cardetail:CarDetail):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add", cardetail)
  }
}


