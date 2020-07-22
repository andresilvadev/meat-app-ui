import { Component, OnInit } from "@angular/core";
import { RadioOptions } from "app/shared/radio/radio-options.model";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  /**
   * payments é um array de RadioOptions
   * que receberá 3 opções
   */
  paymentOptions: RadioOptions[] = [
    { label: "Dinheiro", value: "DINHEIRO" },
    { label: "Cartão de Débito", value: "DEBITO" },
    { label: "Cartão de Refeição", value: "REFEICAO" },
  ];

  constructor() {}

  ngOnInit() {}
}
