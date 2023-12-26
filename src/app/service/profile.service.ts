import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAddress(userId:number): Observable<any> {
    return this.http.get<any>(
      `${urlEndpoint.baseUrl}/user/${userId}`
    );
  }
  
  getUserDetails(userId:number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/user/${userId}`);
  }

  deleteAddress(deleteId: number): Observable<Address> {
    return this.http.delete<Address>(`${urlEndpoint.baseUrl}/user/${deleteId}`);
  }
}
