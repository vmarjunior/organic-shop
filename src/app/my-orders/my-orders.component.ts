import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {

  orders: Order[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService) {

    this.authService.user$.subscribe(user => {
      this.orders = orderService.getUserOrders(user.uid);
    });
    
  }
}
