import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  private create() {
    return this.db.collection('/shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    let cart = this.db.collection('shopping-carts/' + cartId + "/items/").snapshotChanges()
      .pipe(
        map(cart => {

          let shoppingCart = new ShoppingCart();
          shoppingCart.key = cartId;
          shoppingCart.items = cart.map(cartItem => {
            const value = <any>Object.assign({}, cartItem.payload.doc.data());
            value.key = cartItem.payload.doc.id;
            return value;
          });

          return shoppingCart;
        })
      );

    return cart;
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

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = await this.getItem(cartId, product.key);

    item$.get().subscribe(item => {
      item$.set({
        product: product,
        quantity: item.exists ? ((item.data().quantity || 0) + change) : 1
      });
    });
  }

}
