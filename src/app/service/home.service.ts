import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  error: String = '';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMedicine(): void {
    this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/medicine/all`).subscribe({
      next: (response) => {
        console.log(response.data);
        return response;
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  // getCount(): number {
  //   let loggedInUser: User = this.authService.getLoggedInUser();
  //   let userCart: Cart | undefined = this.cart.find(
  //     (c) => c.user.id === loggedInUser.id);
  //   let count: number = 0;
  //   if (userCart) {
  //     for (let product of userCart.cart) {
  //       if (product.count) {
  //         count += product.count;
  //       }
  //     }
  //   }
  //   return count;
  // }
}