import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ObjectResponseModel } from 'src/app/models/objectResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentaldetail';
import { ResponseModel } from 'src/app/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "http://localhost:49454/api/"

  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let apiUrl = this.apiUrl + "rentals/getallbydetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl)
  }

  getLastRentalByCarId(carId:number):Observable<ObjectResponseModel<Rental>>{
    let apiUrl = this.apiUrl + "rentals/getlastrentalbycarid?carId" + carId
    return this.httpClient.get<ObjectResponseModel<Rental>>(apiUrl)
  }
  
  addRental(rental:Rental):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(apiUrl, rental)
  }
}
