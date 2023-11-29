import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppResponse } from "../model/appResponse";
import { urlEndpoint } from "../utils/constant";
import { Observable, Observer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/user/all`);
  }
}
