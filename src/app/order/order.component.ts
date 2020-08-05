import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RadioOptions } from "app/shared/radio/radio-options.model";
import { OrderService } from "./order.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from "./order.model";
import { Router } from "@angular/router";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
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
    this.orderForm = this.formBuilder.group({
      /** Dentro deste objeto, vou ter propriedades que representam
       * os imputs do formulário, e testaremos uma válidação personalizada
       * Temos duas formas para fazer a primeira é:
       * 1 - Podemos colocar o valor da propriedade dentro do objeto name: ''  ou
       * 2 - Utilizar um método do formBuilder que cria um componente pra gente
       * que é um método chamado control -> email: this.formBuilder.control('')
       */
      name: this.formBuilder.control(""),
      email: this.formBuilder.control(""),
      emailConfirmation: this.formBuilder.control(""),
      address: this.formBuilder.control(""),
      number: this.formBuilder.control(""),
      optionalAddress: this.formBuilder.control(""),
      paymentOption: this.formBuilder.control(""),
    });
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
    this.orderService.checkoutOrder(order).subscribe((orderId: string) => {
      console.log(`Compra concluída: ${orderId}`);
      this.router.navigate(["/order-summary"]);
      this.orderService.clear();
    });
  }
}
