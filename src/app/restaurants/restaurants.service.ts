import { Injectable } from "@angular/core";
import { Restaurant } from "./restaurant/restaurant.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MEAT_API } from "app/app.api";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { ErrorHandler } from "app/app.error-handler";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

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

  constructor(private http: HttpClient) {}

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
  restaurants(searchTerm?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;

    if(searchTerm) {
      params =  new HttpParams().append('q', searchTerm);
      // params.append('q', searchTerm);
    }

    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, { params: params })
  }

  /**
   * Métoro que recebe um parâmetro string
   * Que vai retornar um Observable que é um restaurante apenas
   * @param id
   */
  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  /**
   * Método que irá carregar os reviews de cada restaurant
   * Neste caso retornamos um Observable do tipo any
   * @param id
   */
  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  /**
   * Método que vai carregar todos os itens do nosso menu
   * Onde recebe por parâmetro o id do restaurant
   * @param id
   */
  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }
}
