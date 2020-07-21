import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "./shopping-cart.service";

@Component({
  selector: "mt-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  constructor(public shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  /**
   * Método que vai expor os items
   */
  items(): any[] {
    return this.shoppingCartService.items;
  }

  /**
   * Métoro que chama o serviço que limpa o carrinho
   */
  clear() {
    this.shoppingCartService.clear();
  }

  /**
   * Método que chama o serviço que remove um item
   * @param item
   */
  removeItem(item: any) {
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }

  /**
   * Métoro que vai expor o total dos items
   */
  total(): number {
    return this.shoppingCartService.total();
  }
}
