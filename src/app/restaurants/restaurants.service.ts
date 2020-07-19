import { Injectable } from "@angular/core";
import { Restaurant } from "./restaurant/restaurant.model";
import { Http } from "@angular/http";
import { MEAT_API } from "app/app.api";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class RestaurantsService {
  restaurantList: Restaurant[];
  restaurantsListMock: Restaurant[] = [
    {
      id: "bread-bakery",
      name: "Bread & Bakery",
      category: "Bakery",
      deliveryEstimate: "25m",
      rating: 4.9,
      imagePath: "assets/img/restaurants/breadbakery.png",
    },
    {
      id: "burger-house",
      name: "Burger House",
      category: "Hamburgers",
      deliveryEstimate: "100m",
      rating: 3.5,
      imagePath: "assets/img/restaurants/burgerhouse.png",
    },
  ];

  constructor(private http: Http) {}

  /**
   * Método que retorna um array de restaurants
   * usado apenas como mode de teste
   */
  restaurantsMock(): Restaurant[] {
    return this.restaurantsListMock;
  }

  /**
   * Retorna um Observable onde o tipo vai ser um Array de restaurants
   * Precisamos o operador map que vai transformar a resposta ou seja
   * o objeto responde em um array de resturants
   *
   */
  restaurants(): Observable<Restaurant[]> {
    return this.http
      .get(`${MEAT_API}/restaurants`)
      .map((response) => response.json());
  }
}
