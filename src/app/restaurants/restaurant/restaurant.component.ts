import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
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
  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}
