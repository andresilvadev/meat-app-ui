import { Component, OnInit } from "@angular/core";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { MenuItem } from "../menu-item/menu-item.model";

@Component({
  selector: "mt-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  /**
   * Criamos uma propriedade menu que vai retornar
   * um Observable do tipo Array de itens do menu
   * Está é a maneira que utilizamos o pipe async que irá realizar
   * o subscribe e iterar os items do menu em nosso template
   */
  menu: Observable<MenuItem[]>;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params["id"];
    this.menu = this.restaurantsService.menuOfRestaurant(restaurantId);
  }

  /**
   *
   * @param event Quando fizemos o emmit no evento individual eu enviei
   * um objeto, e esse objeto acessamos através dessa sintaxy especial
   * $event
   */
  addMenuItem(event) {
    console.log(event);
  }
}
