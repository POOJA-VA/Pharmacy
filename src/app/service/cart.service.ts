import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { StorageService } from './storage.service';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCountUpdate(increamentCount: Cart):Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`,increamentCount)
    
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private productService: ProductService,
    private storageService: StorageService
  ) {}

  fetchCart(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }

  getCartCount(userId: number): Observable<number> {
    return this.http.get<any[]>(`${urlEndpoint.baseUrl}/cart/${userId}`).pipe(
      map((cartItems: any[]) => {
        console.log('API Response:', cartItems);
        console.log('API Response:', cartItems.length);
        // Assuming the API returns an array of cart items
        return cartItems.length; // Return the count based on the array length
      })
    );
  }

  updateCartItem(cart: Cart): Observable<any> {
    return this.http.put<any>(`${urlEndpoint.baseUrl}/cart/${cart.id}`, cart);
  }

  addItemToCart(increamentCount: Cart): Observable<any> {
    return this.http.post<any>(`${urlEndpoint.baseUrl}/cart`, increamentCount);
  }

  addToCart(
    userId: number,
    productId: number,
    count: number
  ): Observable<Cart[]> {
    const requestData = {
      userId: userId,
      medicineId: productId,
      count: count,
    };
    console.log(requestData);
    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  deleteCart(id: number, medicineId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/cart/${id}/${medicineId}`
    );
  }



  // getCartCount() {
  //   let userId = this.storageService.getLoggedInUser();
  //   let cartArr = this.storageService
  //     .getCart()
  //     ?.filter((item: Cart) => item.userId === userId.id);

  //   if (cartArr) {
  //     let count: number;
  //     count = cartArr.reduce((a: number, c: Cart) => {
  //       if (c.userId === userId.id) {
  //         a += c.count;
  //       }
  //       return a;
  //     }, 0);
  //     return count;
  //   } else {
  //     return 0;
  //   }
  // }
 
}
