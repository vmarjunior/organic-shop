import { Product } from "./product";

export class OrderItem {

  constructor(
    key: string,
    product: Product,
    quantity: number) {
    this.key = key;
    this.product = product;
    this.quantity = quantity;
  }

  key: string;
  product: Product;
  quantity: number;

  totalPrice(): number {
    return this.product.price * this.quantity;
  }
}
