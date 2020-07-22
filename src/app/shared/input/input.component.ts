import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterContentInit,
} from "@angular/core";
import { NgModel } from "@angular/forms";

@Component({
  selector: "mt-input-container",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() label: string;
  @Input() errorMessage: string;

  input: any;

  /**
   * Recebe a referência do model para o content child
   * Como parâmetro do ContentChild você colocar referência a um elemento
   * ou uma Diretiva. Aqui usamos a Diretiva
   * */
  @ContentChild(NgModel) modelRef: NgModel;

  constructor() {}

  ngOnInit() {}

  /**
   * Aqui atribuimos a diretiva model a propriedade input
   * no ciclo de vida do component.
   * Verificamos se o conteúdo que está sendo passado exite a tag ngModel
   */
  ngAfterContentInit(): void {
    this.input = this.modelRef;

    if (this.input === undefined) {
      throw new Error(
        "Esse componente precisa ser usado com uma diretiva ngModel"
      );
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched);
  }
}
