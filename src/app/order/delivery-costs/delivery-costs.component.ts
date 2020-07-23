import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "mt-delivery-costs",
  templateUrl: "./delivery-costs.component.html",
  styleUrls: ["./delivery-costs.component.css"],
})
export class DeliveryCostsComponent implements OnInit {
  /**
   * Corresponde ao valor do frete
   */
  @Input() delivery: number;

  /**
   * Corresponde aos valor total dos itens da compra
   */
  @Input() itemsValue: number;

  constructor() {}

  ngOnInit() {}

  /**
   * Corresponde a soma do frete com o valor dos itens
   */
  total() {
    return this.delivery + this.itemsValue;
  }
}
