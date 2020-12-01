import { Component } from '@angular/core';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders: Order[];

  constructor(orderService: OrderService) {
    this.orders = orderService.getAllOrders();
  }
}
