import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  carts: Cart[] = [];
  user: AppUser = this.storageService.getLoggedInUser();
  totalValue: number = 0;
  selectedItem: string = '';
  total: number = 0;
  itemCount: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (carts: any) => {
        let cartDetails: Product[] = carts.data;
        this.products = cartDetails;
      },
    });

    this.cartService.fetchCart(this.user?.id).subscribe({
      next: (carts: any) => {
        this.storageService.setCart(carts.data);
        let cartDetails: Cart[] = carts.data;
        console.log(carts);
        this.carts = cartDetails;
        this.calculateTotalValue();
      },
      error: () => console.log('error'),
    });
  }

  addToCart(productId: number): void {
    console.log(productId);
    this.cartService
      .addToCart(this.storageService.getLoggedInUser()?.id, productId)
      .subscribe(
        (Response) => console.log(Response),
        () => console.log('product does not added in cart')
      );
  }

  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + cart.quantity * cart.price,
      0
    );
  }

  onDelete(deleteId: number, productId: number): void {
    console.log(deleteId, productId);

    this.cartService.deleteCart(deleteId, productId).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        console.log(cart);
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
    this.ngOnInit();
  }

  // getcount(): number{
  //   let count=this.cartService.getCount();
  //   return count ? count:0;
  // }
}