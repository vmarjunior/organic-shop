import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {

  @Input('cart') cart: ShoppingCart;
  shippingAddress: any = {};


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  placeOrder(cart: ShoppingCart, form: any) {
    this.authService.user$.subscribe(user => {

      console.log(form);

      /*
      if (!user)
        return alert('You need to log in in order to continue.');

      let result = this.orderService.createOrder(cart, this.shippingAddress, user.uid);

      if (result)
        this.router.navigate(['/order-success']);
      else
        alert('There was an error sending your order, please try again later.');
        */
    });
  }
}
