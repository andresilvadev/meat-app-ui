import { Component, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Restaurant } from "./restaurant/restaurant.model";
import { RestaurantsService } from "./restaurants.service";

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.css"],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      // Utilizando WildCard
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  
  searchBarState = 'hidden';
  restaurants: Restaurant[];


  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit() {
    // this.getRestaurantsMock();
    this.getRestaurants();
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
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
