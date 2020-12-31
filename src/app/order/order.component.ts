import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from "@angular/forms";
import { RadioOptions } from "app/shared/radio/radio-options.model";
import { OrderService } from "./order.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from "./order.model";
import { Router } from "@angular/router";

import {tap} from 'rxjs/operators';

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  /** Propriedades Pattern são as responsáveis por receber as REGEX */
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/;

  /**
   * Trabalhando com Reactvie Form pode deixar o código um pouco mais verboso
   * em compensação o template irá ficar mais enxuto, toas as validações da página
   * agora ira ficar no código
   */
  orderForm: FormGroup;

  /**
   * Aqui setamos um valor fixo de 8 reais para o frete
   * em uma aplicação real esse valor viria do back-end
   */
  delivery: number = 8;

  orderId: string;

  /**
   * payments é um array de RadioOptions
   * que receberá 3 opções
   */
  paymentOptions: RadioOptions[] = [
    { label: "Dinheiro", value: "DINHEIRO" },
    { label: "Cartão de Débito", value: "DEBITO" },
    { label: "Cartão de Refeição", value: "REFEICAO" },
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = new FormGroup(
      {
        /** Dentro deste objeto, vou ter propriedades que representam
         * os imputs do formulário, e testaremos uma válidação personalizada
         * Temos duas formas para fazer a primeira é:
         * 1 - Podemos colocar o valor da propriedade dentro do objeto name: ''  ou
         * 2 - Utilizar um método do formBuilder que cria um componente pra gente
         * que é um método chamado control -> email: this.formBuilder.control('')
         */
        name: new FormControl("", {
         validators: [
          Validators.required,
          Validators.minLength(5)
         ],         
        }),
        email: this.formBuilder.control("", [
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
        emailConfirmation: this.formBuilder.control("", [
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
        address: this.formBuilder.control("", [
          Validators.required,
          Validators.minLength(5),
        ]),
        number: this.formBuilder.control("", [
          Validators.required,
          Validators.pattern(this.numberPattern),
        ]),
        optionalAddress: this.formBuilder.control(""),
        paymentOption: this.formBuilder.control("", [Validators.required]),
      },
      { validators: [OrderComponent.equalsTo], updateOn: 'blur' }
    );

    /** Em Reactive Forms podemor criar validadores e associar aos grupos que estamos formando
     *  Então a gente tem um grupo que criamos que representa o form inteiro, criado através da função
     *  group do formBuilder e ela aceita alguns parametros, um desses parametros é o validador
     *  capaz de ter uma referência de todos os campos do grupo e ai fazer uma validação
     *  checando valores de multiplos campos
     */
  }

  /**
   * @param group
   * Tipo AbstracControl que retorna um objeto cujo a chave é do tipo string
   * e o retorno vai ser do tipo boolean.
   * Quando a gente fizer uma validação a gente retorna uma chave e o valor da chave
   * a gente pode escolher como ex: emailsNotMatch e a gente passa um valor booleano
   * e podemos usar esse valor dentro do template para dar um feedback visual.
   *
   * O que esta função faz?
   * Ela vai checkar o valor de dois campos email e emailConfirmation, então
   * a gente recebe o group para gente poder checar e através do metodo get() podemos
   * obter uma referência do input que quisermos através do nome da propriedade do objeto.   *
   */
  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get("email");
    const emailConfirmation = group.get("emailConfirmation");

    /** Checamos se existe dentro do grupo */
    if (!email || !emailConfirmation) {
      return undefined;
    }

    /** Caso eles existam a gente checa os valore, se os valores forem diferente retornamos uma chave
     * essa chave é subjetiva, vc pode criar a chave que quiser contanto que ela te auxilie
     * a dar um feedback visual
     */
    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true };
    }

    /** Caso os valores batam eu retorno undefined e não associo essa chave a grupo nenhum  */
    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    return this.orderService.remove(item);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  /**
   * Aqui percorremos cada item do cartItems() e adicionamos
   * a ordemItems da entidade Order
   * Básicamente transformamos os itens do CartItem para itens
   * da OrderItems
   * @param order
   */
  checkoutOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => {
      return new OrderItem(item.quantity, item.menuItem.id);
    });
    this.orderService.checkoutOrder(order)
    .pipe(tap((orderId: string) => {
      this.orderId = orderId
    }))        
    .subscribe((orderId: string) => {
      console.log(`Compra concluída: ${orderId}`);
      this.router.navigate(["/order-summary"]);
      this.orderService.clear();
    });
  }
}
