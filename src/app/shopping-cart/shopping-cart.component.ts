import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: any;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearShoppingCart() {
    this.shoppingCartService.clearShoppingCart();
  }

  placeOrder(cart: ShoppingCart) {
    this.authService.user$.subscribe(user => {

      if (!user)
        return alert('You need to log in in order to continue.');

      let result = this.orderService.createOrder(cart, user.uid);

      if (result)
        this.router.navigate(['order-success']);
      else
        alert('There was an error sending your order, please try again later.');
    });
  }

}
