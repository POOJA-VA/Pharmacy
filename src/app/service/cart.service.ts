import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private productService: ProductService,
    private storageService: StorageService
  ) {}

  fetchCart(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }

  onDelete(userId:number,medicineId: number): Observable<any> {
    return this.http.delete<any>(`${urlEndpoint.baseUrl}/cart/${userId}/${medicineId}`);
  }
  updateCartItem(cart: Cart): Observable<any> {
    return this.http.put<any>(`${urlEndpoint.baseUrl}/cart/${cart.id}`, cart);
  }

  addItemToCart(increamentCount: Cart): Observable<any> {
    return this.http.post<any>(`${urlEndpoint.baseUrl}/cart`, increamentCount);
  }

  addToCart(userId: number, productId: number,count: number): Observable<Cart[]> {
    const requestData = {
      userId: userId,
      medicineId: productId,
      count: count,
    };
    console.log(requestData);
    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  deleteCart(id: number,medicineId:number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/cart/${id}/${medicineId}`
    );
  }

  cartCountUpdate(
    userId: number,
    productId: number,
    count: number,
    t: number
  ): Observable<Cart[]> {
    const requestData = {
      userId: userId,
      medicineId: productId,
      count: count,
      total: t,
    };
    return this.http.put<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }
}
