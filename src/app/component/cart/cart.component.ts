import { Component, OnInit, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
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
  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  addressId: number = 1;
  error: string = '';
  username: String = '';
  userId = this.storageService.getLoggedInUser().id;
  medicineId:number=0;
  totalValue: number = 0;

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cartService.fetchCart(this.userId).subscribe({
      next: (response: any) => {
        console.log(response.data);
        
        let cartDetails: Cart[] = response.data.cartRequests;
        this.carts = cartDetails;
        // this.calculateTotalValue();
        console.log(this.carts);
        
      },
    });
  }

  onDelete(id: number | undefined, medicineId: number | undefined): void {
    console.log(id,medicineId);
    
    this.cartService.deleteCart(id!,medicineId!).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        this.ngOnInit();
        console.log(cart);
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
  }

  checkOut(): Order[] {
    for (let item of this.carts) {
      let newOrder: Order = {
        id: 0,
        username: this.storageService.getLoggedInUser().username || '',
        orderedMedicineList: [
          {
            id: item.medicine?.id || 0,
            title: item.medicine?.title || '',
            description: item.medicine?.description || '',
            price: item.medicine?.price || 0,
            count: item.count || 0,
          },
        ],
      };0
      this.orders.push(newOrder);

      this.orderService
        .createOrder(this.storageService.getLoggedInUser().id, this.addressId)
        .subscribe({
          next: (response: Order[]) => {
            console.log('response', response);
          },
          complete: () => console.log('orderCreated'),
          error: () => console.log('error'),
        });
    }
    this.storageService.setOrder(this.orders);
    this.router.navigate(['/order'], { replaceUrl: true });
    return this.orders;
  }

  increamentCount(cart: Cart) {
    if (cart.medicine && cart.count !== null && cart.count >= 1) {
      {
        cart.count += 1;
        let increaseCount = {
          userId: this.userId,
          medicineId: cart.medicine.id,
          count: cart.count,
        };
      //   this.cartService
      //     .addItemToCart(increaseCount)
      //     .subscribe((response) => console.log(response));
      }
    }
  }

  decrementCount(cart: Cart) {
    if (cart.medicine && cart.count !== null && cart.count > 1) {
      {
        cart.count -= 1;
        let decreaseCount = {
          userId: this.userId,
          medicineId: cart.medicine.id,
          count: cart.count,
        };
        this.cartService
          .addItemToCart(decreaseCount)
          .subscribe((response) => console.log(response));
      }
    }
  }

  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + cart.count * cart.price!,
      0
    );
  }
}