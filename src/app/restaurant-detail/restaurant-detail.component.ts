import { Component, OnInit } from "@angular/core";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { Restaurant } from "app/restaurants/restaurant/restaurant.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "mt-restaurant-detail",
  templateUrl: "./restaurant-detail.component.html",
  styleUrls: ["./restaurant-detail.component.css"],
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  /**
   * Carregamos no init a chamada do restaurantById do nosso serviço
   * realizando uma inscrição nele
   * Mas para isso precisamos passar o ID do restaurante,
   * Realizamos isso com o objeto do angular activatedRouter
   * Temos duas maneiras de acessar
   * 1 - Através de um snapshots (foto) de como esta o estado do meus parametros
   * 2 - Através de um subscribe
   * Como a gente só quer acessar uma vez não precisamos fazer com subscribe
   */
  ngOnInit() {
    const idRestaurant = this.route.snapshot.params["id"];

    this.restaurantsService
      .restaurantById(idRestaurant)
      .subscribe((restaurant) => (this.restaurant = restaurant));
  }
}
