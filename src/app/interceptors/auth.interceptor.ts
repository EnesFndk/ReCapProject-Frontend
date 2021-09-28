import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalService } from '../services/localservice/local.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService, private localService:LocalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localService.getItem("token");
    let newRequest : HttpRequest<any>

    newRequest = request.clone({
      headers : request.headers.set("Authorization", "Bearer " + token)
    })
    return next.handle(newRequest);
  }
}
