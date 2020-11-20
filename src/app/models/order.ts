import { AppUser } from "./app-user";
import { ShoppingCartItem } from "./shopping-cart-item";

export class Order {
  key: string;
  orderDate: Date;
  userId: string;
  items: ShoppingCartItem[];
}
