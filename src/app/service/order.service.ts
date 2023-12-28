import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlEndpoint } from '../utils/constant';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { Status } from '../model/status';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  fetchdata(userId:number): Observable<Order[]> {
    return this.http.get<Order[]>(`${urlEndpoint.baseUrl}/order/${userId}`);
  }

  getAllOrderDetails(): Observable<Order[]> {
    return this.http.get<Order[]>(`${urlEndpoint.baseUrl}/admin/order/all`);
  }

  // createOrder(userId:number,medicineId:number,addressId:number):Observable<Order[]>{
  //   let orderdata={
  //     userId:userId,
  //     medicineId:medicineId,
  //     addressId:addressId
  //   }
  //   return this.http.post<Order[]>(`${urlEndpoint.baseUrl}/order`,orderdata)
  // }

  // getorderStatus(): Observable<Status[]> {
  //   return this.http.get<Status[]>(
  //     `${urlEndpoint.baseUrl}/admin/order/status`
  //   );
  // }

  createOrder(
    userId: number,
    addressId: number
  ): Observable<Order[]> {
    let orderdata = {
      userId: userId,
      addressId: addressId,
    };
    return this.http.post<Order[]>(`${urlEndpoint.baseUrl}/order`, orderdata);
  }
  // admin order status change
  getorderStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(
      `${urlEndpoint.baseUrl}/admin/order/status`
    );
  }

  changeOrderStatus(
    orderId: number,
    statusId: string
  ): Observable<Status[]> {
    let orderstatus = {
      orderId: orderId,
      statusId: statusId,
    }
    return this.http.put<Status[]>(
      `${urlEndpoint.baseUrl}/admin/order/status`,
      orderstatus
    );
  }
}