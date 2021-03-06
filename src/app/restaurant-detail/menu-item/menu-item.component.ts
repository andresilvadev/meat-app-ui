import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { trigger, state, style, transition, animate } from '@angular/animations';

import { MenuItem } from "./menu-item.model";

@Component({
  selector: "mt-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.css"],
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {
  /**
   * Criar uma propriedade que represente um item do menu
   * para que o component parent (pai) que realmente tem os itens
   * passem para mim e consigo popular o meu template
   * Usamos o decorator @Input para informar que o parent vai informar para vc
   */
  @Input() menuItem: MenuItem;

  /**
   * Criando um evento personalizado, usamos o decorator @Output a nossa propriedade
   * de saída, todos os meus eventos ele são marcados com @Output e aqui chamamos
   * a propriedade de add, agora precisamos criar em algum momento
   * dentro do componente para emitir esse evento
   */
  @Output() add = new EventEmitter();

  menuItemState = 'ready'

  constructor() {}

  ngOnInit() {}

  /**
   * Quando esse método for chamado ele vai disparar nosso evento criado acima
   * Aí passamos o nosso objeto, neste caso o menuItem
   */
  emitAddEvent() {
    this.add.emit(this.menuItem);
  }
}
