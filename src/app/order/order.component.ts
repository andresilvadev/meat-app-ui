import { Component, OnInit } from "@angular/core";
import { RadioOptions } from "app/shared/radio/radio-options.model";
import { OrderService } from "./order.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  /**
   * Aqui setamos um valor fixo de 8 reais para o frete
   * em uma aplicação real esse valor viria do back-end
   */
  delivery: number = 8;

  /**
   * payments é um array de RadioOptions
   * que receberá 3 opções
   */
  paymentOptions: RadioOptions[] = [
    { label: "Dinheiro", value: "DINHEIRO" },
    { label: "Cartão de Débito", value: "DEBITO" },
    { label: "Cartão de Refeição", value: "REFEICAO" },
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {}

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    return this.orderService.remove(item);
  }
}
