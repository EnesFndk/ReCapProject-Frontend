import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
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
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add", brand)
  }
}