import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Status } from 'src/app/model/status';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class AdminOrderComponent {
  orderDetails: Order[] = [];
  orderStatus: Status[] = [];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.getAllOrderDetails().subscribe({
      next: (order: any) => {
        let orderDetail: Order[] = order.data;
        console.log(order);
        this.orderDetails = orderDetail;
      },

      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }

  onStatusChange(order: Order) {
    console.log(order.orderStatus);
    
    this.orderService.changeOrderStatus(order.id, order.orderStatus!).subscribe({
      next:(response: any) => console.log(response.data),
    });
    }
}
