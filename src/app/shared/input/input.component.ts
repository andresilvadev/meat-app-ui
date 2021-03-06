import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterContentInit,
} from "@angular/core";
import { NgModel, FormControlName } from "@angular/forms";

@Component({
  selector: "mt-input-container",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent implements OnInit, AfterContentInit {
  
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() showTip: boolean = true;

  input: any;

  /**
   * Recebe a referência do model para o content child
   * Como parâmetro do ContentChild você colocar referência a um elemento
   * ou uma Diretiva. Aqui usamos a Diretiva
   * Lembrando que NgModel é exclusivo para template form
   * */
  @ContentChild(NgModel) modelRef: NgModel;

  @ContentChild(FormControlName) control: FormControlName;

  constructor() {}

  ngOnInit() {}

  /**
   * Aqui atribuimos a diretiva model a propriedade input
   * no ciclo de vida do component.
   * Verificamos se o conteúdo que está sendo passado exite a tag ngModel
   */
  ngAfterContentInit(): void {
    /** Aqui vamos tentar pegar uma das duas diretivas se a diretiva NgModel não estiver disponível
     * a gente vai procurar pela diretiva FormControlName, se ela não estiver disponível aí a gente
     * vai mostrar o erro.
     */
    this.input = this.modelRef || this.control;

    if (this.input === undefined) {
      throw new Error(
        "Esse componente precisa ser usado com uma diretiva ngModel ou formControlName"
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
