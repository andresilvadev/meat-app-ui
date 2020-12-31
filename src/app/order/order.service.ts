import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "app/app.api";
import { LoginService } from "app/security/login/login.service";

import { Observable } from "rxjs";
import {map} from 'rxjs/operators';

@Injectable()
export class OrderService {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private http: HttpClient
  ) {}

  itemsValue(): number {
    return this.shoppingCartService.total();
  }

  cartItems(): CartItem[] {
    return this.shoppingCartService.items;
  }

  increaseQty(item: CartItem) {
    this.shoppingCartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.shoppingCartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.shoppingCartService.removeItem(item);
  }

  /**
   * JSON.stringfy() envia uma representação textual do objeto json
   * @param order
   */
  checkoutOrder(order: Order): Observable<string> { 
    return this.http.post<Order>(`${MEAT_API}/orders`, order)
          .pipe(map(order => order.id))
  }

  clear() {
    this.shoppingCartService.clear();
  }
}
