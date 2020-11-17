import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }


  //Public API

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    let cart = this.db.collection('shopping-carts/' + cartId + "/items/").snapshotChanges()
      .pipe(
        map(cart => {

          let shoppingCart = new ShoppingCart();
          shoppingCart.key = cartId;
          shoppingCart.items = cart.map(cartItem => {

            let data = (cartItem.payload.doc.data() as any);

            let item = new ShoppingCartItem(
              cartItem.payload.doc.id,
              data.product,
              data.quantity
            );

            return item;
          });

          return shoppingCart;
        })
      );

    return cart;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearShoppingCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.collection('/shopping-carts/').doc(cartId).collection('/items/').get().forEach(item => item.docs.forEach(doc => doc.ref.delete()));
  }


  //Private API

  private create() {
    return this.db.collection('/shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.collection('/shopping-carts/' + cartId + '/items/').doc(productId);
  }

  private async getOrCreateCartId(): Promise<string> {

    let cartId = localStorage.getItem('cartId');
    if (cartId)
      return cartId;

    let cart = await this.create();
    localStorage.setItem('cartId', cart.id);
    return cart.id;
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = await this.getItem(cartId, product.key);

    item$.get().subscribe(item => {

      let quantity = item.exists ? ((item.data().quantity || 0) + change) : 1;

      if (quantity >= 1)
        item$.set({
          product: product,
          quantity: quantity
        });
      else
        item.ref.delete();

    });
  }

}
