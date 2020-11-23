import { AppUser } from "./app-user";
import { ShoppingCartItem } from "./shopping-cart-item";
import { ShippingAddress } from "./shipping-address";

export class Order {
  key: string;
  orderDate: Date;
  userId: string;
  user: AppUser;
  items: ShoppingCartItem[];
  shipping: ShippingAddress;
}
