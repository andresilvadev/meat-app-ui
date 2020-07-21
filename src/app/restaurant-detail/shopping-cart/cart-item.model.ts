import { MenuItem } from "../menu-item/menu-item.model";

export class CartItem {
  constructor(public menuItem: MenuItem, public quantity: number = 1) {}

  /**
   * Método value retorna o valor do item
   * Valor do item é a quantidade vezes o preço do item
   * que está associado ao item do carrinho de compras
   */
  value(): number {
    return this.menuItem.price * this.quantity;
  }
}
