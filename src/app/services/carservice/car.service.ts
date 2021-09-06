import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from 'src/app/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'http://localhost:49454/api/'

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getall'
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
