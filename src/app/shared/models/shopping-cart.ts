import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";


export class ShoppingCart {
  key: string;
  items: ShoppingCartItem[];

  totalItemsCount(): number {
    let count = 0;
    this.items.forEach(item => count += item.quantity);
    return count;
  }

  totalPrice(): number {
    let price = 0;
    this.items.forEach(item => price += item.totalPrice());
    return price;
  }

  getProductQuantity(product: Product): number {
    let item = this.items.find(x => x.key == product.key);
    return item ? item.quantity : 0;
  }

}
