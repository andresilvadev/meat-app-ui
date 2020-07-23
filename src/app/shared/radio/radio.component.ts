import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { RadioOptions } from "./radio-options.model";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "mt-radio",
  templateUrl: "./radio.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements OnInit, ControlValueAccessor {
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
  onChange: any;

  constructor() {}

  ngOnInit() {}

  setValue(value: any) {
    this.value = value;
    this.onChange(this.value);
  }

  /**
   * Método chamado pelas diretivas quando elas querem passar um valor para seu
   * componente
   * @param obj
   */
  writeValue(obj: any): void {
    this.value = obj;
  }

  /**
   * Ele passa uma função sempre que o valor interno mudar
   * ele chama essa função passando o novo valor
   * chamado no setValue()
   * Dessa forma eu aviso as diretivas que estão sendo usadas pelo meu
   * componente que o valor mudou.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Quando o usuário entrou no seu componente
   * @param fn
   */
  registerOnTouched(fn: any): void {}

  /**
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {}
}
