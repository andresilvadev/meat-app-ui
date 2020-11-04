import { Component, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { ShoppingCartService } from "./shopping-cart.service";

@Component({
  selector: "mt-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        /**
         * opacity: 0 = Começa invisivel
         * transform: translateX(-30) = por que vamos mexer somente nas laterais
         * offset: 0 = Onde dentro da animação o keyframe vai estar, offset marca o keyframe
         * offset 0 é o primeiro ponto da animação
         */
        style({opacity:0, transform: 'translateX(-30px)', offset: 0}),
        style({opacity:0.8, transform: 'translateX(10px)', offset: 0.8}),
        style({opacity:1, transform: 'translateX(0px)', offset: 1})
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([       
        style({opacity:1, transform: 'translateX(0px)', offset: 0}),
        style({opacity:0.8, transform: 'translateX(-10px)', offset: 0.2}),
        style({opacity:0, transform: 'translateX(30px)', offset: 1})
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready'

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
