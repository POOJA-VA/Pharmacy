import { Injectable } from '@angular/core';
import { Address } from '../model/address';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { UserDetail } from '../model/user-detail';

@Injectable({
  providedIn: 'root'
})
    export class UserprofileService {
      constructor() {}
      // fetchdata(): Observable<UserDetail[]> {
      //   return this.http.get<UserDetail[]>(
      //     `${urlEndpoint.baseUrl}/admin/user/all`
      //   );
      // }
    
      // getUserById(userId: number): Observable<UserDetail[]> {
      //   return this.http.get<UserDetail[]>(
      //     `${urlEndpoint.baseUrl}/user/${userId}`
      //   );
      // }
}
