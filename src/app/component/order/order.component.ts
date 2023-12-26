import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
// Other imports...

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderDetails: Order[] = [];
  user: AppUser;
  selectedItem: string | null = '';
  totalValue: number = 0;
  carts: Cart[] = [];
  medicine: any[] = [];

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.orderService.fetchdata(this.user?.id).subscribe({
      next: (orders: any) => {

        this.orderDetails = orders.data;
        this.orderDetails.forEach((order) => {
          order.orderedMedicineList.forEach((medicines) => {
            this.medicine.push(medicines);
          });
        });
      },
      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }
}