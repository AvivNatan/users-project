import { inject, Injectable, signal } from '@angular/core';
import {LoginReq} from '../../model/LoginReq.type';
import {RegisterReq} from '../../model/RegisterReq.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private http = inject(HttpClient);  // class member
  private baseUrl = 'http://localhost:5050/api/users/'; // class member
  public isLoggedIn = signal<boolean>(false);

  loginFromApi(loginReq : LoginReq) : Observable<string>
  {
      const url = this.baseUrl + 'login'; // local member
      return this.http.post<string>(url, loginReq);
  }

  registerFromApi(registerReq : RegisterReq) : Observable<string>
  {
      const url = this.baseUrl+ 'register';
      return this.http.post<string>(url,  registerReq);
  }

  logout()
  {
    this.isLoggedIn.set(false);
  }

}
