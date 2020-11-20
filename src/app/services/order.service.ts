import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Order } from '../models/order';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFirestore,
    private shoppingCartService: ShoppingCartService) { }

  createOrder(shoppingCart: ShoppingCart, userId: string): boolean {
    this.db.collection('orders').add({
      orderDate: new Date().getTime(),
      items: this.getCartItems(shoppingCart.items),
      totalPrice: shoppingCart.totalPrice(),
      itemsCount: shoppingCart.totalItemsCount(),
      userId: userId
    });

    this.shoppingCartService.clearShoppingCart();

    return true;
  }


  getUserOrders(userId: string): Order[] {
    let returnOrders = [];

    this.db.collection('orders').valueChanges({ userId: userId })
      .subscribe(orders =>
        orders.forEach(order =>
          returnOrders.push(order)
        ));

    return returnOrders;
  }

  getAllOrders(): Order[] {
    let returnOrders = [];

    this.db.collection('orders').valueChanges()
      .subscribe(orders =>
        orders.forEach(order =>
          returnOrders.push(order)
        ));

    return returnOrders;
  }

  private getCartItems(shoppingCartItems: ShoppingCartItem[]) {
    let items = [];

    shoppingCartItems.forEach(item => items.push({
      product: item.product,
      quantity: item.quantity,
      totalPrice: item.totalPrice()
    }));

    return items;
  }

}
