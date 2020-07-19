import { Component, OnInit } from "@angular/core";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "mt-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.css"],
})
export class ReviewsComponent implements OnInit {
  /**
   * Neste caso usamos o pipe async em nosso template.html
   * ele quem vai fazer o subscribe e iterar os elementos
   */
  reviews: Observable<any>;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /**
     * No detalhe do restaurante temos um caminho que é /restaurants/id
     * Então a rota acionada vai diretamente para aquele componente
     * Aqui estamos em um componente filho que é uma subrota
     * Então o parametro não é desse componente é sim de um componente pai ou (parent)
     * Então acessamos este dado através de um objeto chamado parent da rota
     */
    const idRestaurant = this.route.parent.snapshot.params["id"];
    this.reviews = this.restaurantsService.reviewsOfRestaurant(idRestaurant);
  }
}
