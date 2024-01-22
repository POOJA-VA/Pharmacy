import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from './service/auth.service';
import { LoaderService } from './service/loader.service';
import { CartService } from './service/cart.service';
import { StorageService } from './service/storage.service';
import { Cart } from './model/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  cartCount: number = 0;
  userId = this.storageService.getLoggedInUser().id;
  carts: Cart[] = [];

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private cartService: CartService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.getCartCount();
  }

  logout(): void {
    this.authService.logout();
  }

  getCartCount() {
    this.cartService.fetchCart(this.userId).subscribe({
      next: (response: any) => {
        console.log(response.data);
        let cartDetails: Cart[] = response.data.cartRequests;
        this.carts = cartDetails;
        console.log(" Count "+this.carts.forEach((cart)=>this.cartCount += cart.count));
      },
    });
  }
}
