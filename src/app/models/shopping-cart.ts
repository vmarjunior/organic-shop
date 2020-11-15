import { ShoppingCartItem } from "./shopping-cart-item";


export class ShoppingCart {
  key: string;
  items: ShoppingCartItem[];

  getTotalItemsCount(): number {
    let count = 0;
    this.items.forEach(item => count += item.quantity);
    return count;
  }
}
