import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:49454/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<ObjectResponseModel<TokenModel>>{
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.apiUrl+"login" , loginModel)
  }
  
  register(registerModel:RegisterModel):Observable<ObjectResponseModel<TokenModel>>{
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.apiUrl+"register", registerModel)
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }
  }
}
