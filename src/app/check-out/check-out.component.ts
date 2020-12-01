import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: any;

  constructor(
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
