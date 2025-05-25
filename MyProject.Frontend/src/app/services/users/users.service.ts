import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserInfo } from '../../model/UserInfo.type';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);  // class member
  

  baseUrl = 'http://localhost:5050/api/users/'; // class member

  getUsersFromApi(name? : string) : Observable<UserInfo[]>
  {
    let url = this.baseUrl + 'users'; // local member
    let params = new HttpParams();

    if(name)
    {
      params = params.set('name',name);
    }
    
    return this.http.get<UserInfo[]>(url,{params});
  }

  updateGenderFromApi(email : string) : Observable<any>
  {
    let url = this.baseUrl + 'update';

    return this.http.post<Observable<any>>(url,{email});
  }

  getUserByEmailFromApi(email: string | null) : Observable<UserInfo>
  {
    let url = this.baseUrl + 'user';
    let params = new HttpParams();

    if(email!=null)
    {
      params=params.set('email',email);
    }

    return this.http.get<UserInfo>(url,{params});
  }


}
