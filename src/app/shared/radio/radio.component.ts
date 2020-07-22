import { Component, OnInit, Input } from "@angular/core";
import { RadioOptions } from "./radio-options.model";

@Component({
  selector: "mt-radio",
  templateUrl: "./radio.component.html",
})
export class RadioComponent implements OnInit {
  /**
   * Declaração de propriedade options do tipo
   * Array de RadioOptins que é a classe criada
   * Essas opções vão vir de fora por isso usamos o input()
   */
  @Input() options: RadioOptions[];

  /**
   * Propriedade que representa o valor do radio
   */
  value: any;

  constructor() {}

  ngOnInit() {}

  setValue(value: any) {
    this.value = value;
  }
}
