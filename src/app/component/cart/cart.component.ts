import { Component, OnInit, numberAttribute } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  userId = this.storageService.getLoggedInUser().id;
  totalValue: number = 0;
  total: number = 0;
  selectedItem: string = '';
  user: AppUser = {
    id: 0,
    username: '',
    password: '',
    role: '',
  };
  itemCount: number = 1;

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartService.fetchCart(this.userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        this.carts = cartDetails;
      },
    });
  }

  addCartItemToCart(item: any): void {
    this.cartService.addItemToCart(item).subscribe({
      next: () => {
        this.cartService.fetchCart(this.userId).subscribe({
          next: (carts: any) => {
            let cartDetails: Cart[] = carts.data;
            this.carts = cartDetails;
          },
        });
      },
    });
  }

  updateCartItem(cart: Cart): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    this.cartService.updateCartItem(cart).subscribe({
      next: () => {
        this.cartService.fetchCart(userId).subscribe({
          next: (carts: any) => {
            let cartDetails: Cart[] = carts.data;
            this.carts = cartDetails;
          },
        });
      },
    });
  }

  onDelete(id: number): void {
    this.cartService.deleteCart(this.userId, id).subscribe({
      next: () => {
        this.ngOnInit();
      },
    });
  }

  increamentCount(cart: Cart):void {
    cart.count += 1;
    this.countIncreaseOrDecrease(cart);
  }
  decrementCount(cart: Cart):void {
    if (cart.count != 1) {
      cart.count -= 1;
      this.countIncreaseOrDecrease(cart);
    }
  }

 private countIncreaseOrDecrease(cart: Cart): void {
    this.cartService
      .cartCountUpdate(this.user.id, cart.medicineId, cart.count, this.total)
      .subscribe((response) => console.log(response));
    this.calculateTotalValue();
  }

  calculateTotalValue(): number {
    this.carts.forEach((cartItem) => {
      this.totalValue = 0;
      if (cartItem.count != null) {
        this.totalValue += cartItem.price * cartItem.count;
      } else {
        this.totalValue += cartItem.price;
      }
    });
    return this.totalValue;
  }

  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  addressId: number = 1;

  checkOut(): Order[] {
    for (let cart of this.cartItem) {
      this.orders.push({
        id: 0,
        total: cart.total,
        username: this.storageService.getLoggedInUser().username,
        orderedMedicineList: [
          {
            id: cart.medicineId,
            title: cart.title,
            price: cart.price,
            count: cart.count,
          },
        ],
      });

      this.orderService
        .createOrder(cart.userId, cart.medicineId, this.addressId)
        .subscribe({
          next: (response: Order[]) => {
            console.log('response', response);
            this.orders = response;
            this.ngOnInit();
          },
          complete: () => console.log('orderCreated'),
          error: () => console.log('error'),
        });
    }
    this.storageService.setOrder(this.orders);
    return this.orders;
  }
}


