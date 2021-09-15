import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ObjectResponseModel } from 'src/app/models/objectResponseModel';
import { ResponseModel } from 'src/app/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'http://localhost:49454/api/'

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + 'brands/getall'
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }

  getByBrandId(brandId:number):Observable<ObjectResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getbyid?id="+ brandId
    return this.httpClient.get<ObjectResponseModel<Brand>>(newPath)
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add", brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/update", brand)
  }
  delete(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/delete", brand)
  }
}