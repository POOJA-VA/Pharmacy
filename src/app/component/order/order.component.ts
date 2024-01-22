import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  error: string = "";
  orders: Order[]=[];
  userId = this.storageService.getLoggedInUser().id;

  constructor(private orderService: OrderService,private storageService:StorageService) {}

  ngOnInit(userId:number): void {
    this.orderService.fetchdata(this.userId).subscribe({
      next: (response: any) => {
        this.orders = response.data;
        console.log(this.orders,"work");
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
}