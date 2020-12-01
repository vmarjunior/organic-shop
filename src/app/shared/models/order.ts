import { AppUser } from "./app-user";
import { ShippingAddress } from "./shipping-address";
import { OrderItem } from "./order-item";

export class Order {
  key: string;
  orderDate: Date;
  userId: string;
  items: OrderItem[];
  itemsCount: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;

  //Auxiliary
  user: AppUser;
}
