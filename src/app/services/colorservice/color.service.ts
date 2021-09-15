import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ObjectResponseModel } from 'src/app/models/objectResponseModel';
import { ResponseModel } from 'src/app/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'http://localhost:49454/api/'

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + 'colors/getall'
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }
  
  getByColorId(colorId:number):Observable<ObjectResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getbyid?id="+colorId
    return this.httpClient.get<ObjectResponseModel<Color>>(newPath)
  }
  
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add", color)
  }

  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/update", color)
  }
  delete(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/delete", color)
  }
}
