import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectResponseModel } from 'src/app/models/objectResponseModel';
import { ResponseModel } from 'src/app/models/responsemodel';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userDetail';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:49454/api/'

  constructor(private httpClient:HttpClient) { }

  getUserById(userId:number):Observable<ObjectResponseModel<User>> {
    let apiUrl = this.apiUrl + "users/getbyid?id=" + userId
    return this.httpClient.get<ObjectResponseModel<User>>(apiUrl)
  }

  getUserByEmail(email:string):Observable<ObjectResponseModel<UserDetail>>{
    let apiUrl = this.apiUrl + "users/getbyemail?email=" + email 
    return this.httpClient.get<ObjectResponseModel<UserDetail>>(apiUrl)
  }

  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel> {
    let apiUrl = this.apiUrl + "users/update"
    return this.httpClient.post<ResponseModel>(apiUrl, userForUpdateDto)
  }
}
