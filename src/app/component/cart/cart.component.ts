import { Component, OnInit, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
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
  totalValue: number = 0;
  total: number = 0;
  selectedItem: string = '';
  user: AppUser={
    id:0,
    username: '',
    password: '',
    role:''
  };

  itemCount: number = 1;

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;

    this.cartService.fetchCart(userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        this.carts = cartDetails;
      },
    });
  }

  onDelete(id: number): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    console.log(userId);
    
    this.cartService.deleteCart(userId, id).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        this.ngOnInit();
        console.log(cart);
      }
    });
  }

  addCartItemToCart(item: any): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    this.cartService.addItemToCart(item).subscribe({
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

  // decreaseQuantity(cartId: number): void {
  //   const cartToUpdate = this.carts.find((cart) => cart.id === cartId);
  //   if (cartToUpdate && cartToUpdate.quantity > 0) {
  //     cartToUpdate.quantity--;
  //     this.updateCartItem(cartToUpdate);
  //   }
  // }

  // increaseQuantity(cartId: number): void {
  //   const cartToUpdate = this.carts.find((cart) => cart.id === cartId);
  //   if (cartToUpdate) {
  //     cartToUpdate.quantity++;
  //     this.updateCartItem(cartToUpdate);
  //   }
  // }

  increamentCount(cart: Cart) {
      cart.count += 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.medicineId, cart.count, this.total)
        .subscribe((response) => console.log(response));
  }
  decrementCount(cart: Cart) {
    if (cart.count != 1) {
      cart.count -= 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.medicineId, cart.count, this.total)
        .subscribe((response) => console.log(response));
    }
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

  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + cart.count * cart.price,
      0
    );
  }

  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  addressId: number = 3;

  checkOut(): Order[] {
    for (let cart of this.cartItem) {
      this.orders.push({
        id: 0,
        total: cart.total,
        username:this.storageService.getLoggedInUser().username,
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
          },
          complete: () => console.log('orderCreated'),
          error: () => console.log('error'),
        });
    }
    this.storageService.setOrder(this.orders);
    return this.orders;
  }
}

// addcount(): number {
//   let cart: Cart[] = this.storage.getCart();
//   let loggedInUser: User = this.auth.getLoggedInUser();

//   let userCart: Cart | undefined = cart.find(
//     (c) => c.user.id === loggedInUser.id
//   );
//   let count: number = 0;

//   if (userCart) {
//     for (let product of userCart.cart) {
//       if (product.count) count += product.count;
//     }
//   }
//   return count;
// }

// getCount(): number {
//   let loggedInUser: User = this.auth.getLoggedInUser();
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
