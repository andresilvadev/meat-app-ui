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
  items(): any {
    return this.shoppingCartService.items;
  }

  /**
   * Métoro que vai expor o total dos items
   */
  total(): number {
    return this.shoppingCartService.total();
  }
}
