import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  cartItem: number = 0;
  products: Product[] = [];
  carts: Cart[] = [];
  paginatedCarts: Cart[] = [];
  user: AppUser = this.storageService.getLoggedInUser();
  totalValue: number = 0;
  selectedItem: string = '';
  total: number = 0;
  itemCount: number = 1;
  count=0;
  itemsPerPage: number = 3;
  currentPage: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private storageService: StorageService,
    private snackBar: MatSnackBar
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
        // this.calculateTotalValue();
      },
      error: () => console.log('error'),
    });
  }

  addToCart(productId: number): void {
    console.log(productId);
    this.count++;
    this.cartService
      .addToCart(this.storageService.getLoggedInUser()?.id, productId, this.count)
      .subscribe(
        (Response) => console.log(Response),
      );
    this.openSnackBar('Product Added!!!', 'Close');
  }

  onDelete(deleteId: number, productId: number): void {
    console.log(deleteId, productId);
    this.cartService.deleteCart(deleteId,productId).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        console.log(cart);
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
    this.ngOnInit();
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.products.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Specify the duration for the snackbar (in milliseconds)
      panelClass: ['snackbar-custom-class'] 
    });
  }
}