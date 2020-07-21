import { Injectable } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

@Injectable()
export class ShoppingCartService {
  /** Itens no nosso carrinho */
  items: CartItem[] = [];

  constructor() {}

  /**
   * Método responsável por limpar os dados do carrinho
   */
  clear() {
    this.items = [];
  }

  /**
   * Acidiona um item do menu a lista de itens do carrinho
   * Se formos adicionar um item do menu que já existe dentro
   * do carrinho de compras, eu não vou adicionar um segundo item
   * neste caso vamos apenas aumentar a quantidade do item.
   */
  addItem(item: MenuItem) {
    // let foundItem = this.items.find(function (produto) {
    //   return produto.menuItem.id === item.id;
    // });

    let foundItem = this.items.find(
      (produto) => produto.menuItem.id === item.id
    );

    if (foundItem) {
      foundItem.quantity = foundItem.quantity + 1;
    } else {
      this.items.push(new CartItem(item));
    }
  }

  /**
   * Remove um item da lista do carrinho
   * Precisamos informar qual indice que queremos remover
   * Informar o indice que quero começar e a quantidade a ser removida
   * Então eu quero a partir do indice do intem que eu estou
   * @param item
   */
  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  /**
   * Total onde o retorno é um number
   * Total agente faz um map e substitui o item pelo valor daquele item
   * Então estamos trocando um array de itens para um array de números
   * Depois usamos o reduce onde temos o valor anterior e o valor atual
   * somando os dois
   */
  total(): number {
    let valorInicial = 0;
    return this.items
      .map((item) => item.value())
      .reduce((prev, value) => prev + value, valorInicial);
  }
}
