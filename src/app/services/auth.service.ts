import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';
import { LocalService } from './localservice/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:49454/api/auth/";

  constructor(private httpClient:HttpClient, private localService:LocalService) { }

  login(loginModel:LoginModel):Observable<ObjectResponseModel<TokenModel>>{
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.apiUrl+"login" , loginModel)
  }
  
  register(registerModel:RegisterModel):Observable<ObjectResponseModel<TokenModel>>{
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.apiUrl+"register", registerModel)
  }

  isAuthenticated(){
    if (this.localService.getItem("token") && this.localService.getItem("user_details")) {
      return true;
    }
    else{
      return false;
    }
  }
}
