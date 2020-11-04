import { Component, OnInit, Input } from "@angular/core";

// Inportando as funções de animações
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Restaurant } from "./restaurant.model";

@Component({
  selector: "mt-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.css"],
  /**
   * Precisamos de uma propriedade animations onde o valor é um array
   * E para definir uma animação usamos a função trigger('nomeDaTrigger') onde o nome da trigger é 
   * o nome da animação, dentro vai ter um array que será os estados e animações
   * 
   */
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {
  /**
   * Aqui temos duas opções, criar o restaurant com o tipo any para representar a propriedade,
   * o que não fica muito legivel por que vc não sabe qual o tipo que esta representando aquela propriedade
   *
   * A outra opção é criar um tipo que represente a propriedade restaurant
   * Outro ponto é importar o decorator @input() e marcar nossa propriedade restaurante,
   * isso vai permitir que outros componentes possam passar o restaurant para o componente restaurant.
   */
  @Input() restaurant: Restaurant;

  /**
   * Criando o stado da trigger
   */
  restaurantState = 'ready'

  constructor() { }

  ngOnInit() { }
}
