import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {

  @Input('cart') cart: ShoppingCart;
  shippingAddress: any = {};


  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  placeOrder(cart: ShoppingCart, form: any) {
    this.authService.user$.subscribe(user => {

      if (!user)
        return alert('You need to log in in order to continue.');

      let result = this.orderService.createOrder(cart, this.shippingAddress, user.uid);

      if (result)
        this.router.navigate(['/order-success']);
      else
        alert('There was an error sending your order, please try again later.');

    });
  }
}
