import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";

@Component({
  selector: "mt-order-items",
  templateUrl: "./order-items.component.html",
  styleUrls: ["./order-items.component.css"],
})
export class OrderItemsComponent implements OnInit {
  /**
   * Vamos ter uma lista de items e
   * 3 Eventos
   * Aumentar a quantidade
   * Diminuir a quantidade
   * Remover o item
   */
  @Input() items: CartItem[];

  /**
   * EventEmitter ele suporta um tipo genérico mas vc
   * pode dizer para ele qual tipo de evento ele vai emitir
   * Podemos dizer que ele vai emitir um cartItem
   */
  @Output() increaseQty = new EventEmitter<CartItem>();
  @Output() decreaseQty = new EventEmitter<CartItem>();
  @Output() remove = new EventEmitter<CartItem>();

  constructor() {}

  ngOnInit() {}

  /**
   * Precisamos receber um item para emitir baseado a este item
   * Que é o item que estamos iterando no momento
   * @param item
   */
  emitIncreaseQty(item: CartItem) {
    this.increaseQty.emit(item);
  }

  emitDecreaseQty(item: CartItem) {
    this.decreaseQty.emit(item);
  }

  emitRemove(item: CartItem) {
    this.remove.emit(item);
  }
}
