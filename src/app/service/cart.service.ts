import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { Product } from '../model/product';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient,private authService: AuthService,private productService: ProductService, private storageService: StorageService) {}

  fetchCart(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }

  deleteCartItem(cartId: number): Observable<any> {
    return this.http.delete<any>(`${urlEndpoint.baseUrl}/cart/${cartId}`);
  }

  addItemToCart(item: any): Observable<any> {
    return this.http.post<any>(`${urlEndpoint.baseUrl}/cart`, item);
  }
  
  updateCartItem(cart: Cart): Observable<any> {
    return this.http.put<any>(`${urlEndpoint.baseUrl}/cart/${cart.id}`, cart);
  }

    addToCart(userId: number, productId: number): Observable<Cart[]> {
    let count: number = 1;
    const requestData = {
      userId: userId,
      medicineId: productId,
      count: count,
    };
    console.log(requestData);

    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  deleteCart(id: number, productId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/cart/${id}/${productId}`
    );
  }
}