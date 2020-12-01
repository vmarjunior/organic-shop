import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input('cart') cart: ShoppingCart;

  constructor() { }

  ngOnInit() {
    console.log(this.cart);
  }

}
