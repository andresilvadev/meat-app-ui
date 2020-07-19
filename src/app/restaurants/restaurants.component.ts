import { Component, OnInit } from "@angular/core";
import { Restaurant } from "./restaurant/restaurant.model";
import { RestaurantsService } from "./restaurants.service";

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.css"],
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit() {
    // this.getRestaurantsMock();
    this.getRestaurants();
  }

  getRestaurantsMock() {
    this.restaurants = this.restaurantService.restaurantsMock();
    return this.restaurants;
  }

  /**
   * Quando o serviço retorna um Observable, precisamos se inscrever nele
   * fazemos isso utilizando o subscribe, e vou pegar o que eu receber
   * e passar para o valor da minha propriedade
   */
  getRestaurants() {
    this.restaurantService
      .restaurants()
      .subscribe((restaurants) => (this.restaurants = restaurants));
  }
}
