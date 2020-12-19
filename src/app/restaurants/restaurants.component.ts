import { Component, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Restaurant } from "./restaurant/restaurant.model";
import { RestaurantsService } from "./restaurants.service";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

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
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantService: RestaurantsService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    // this.getRestaurantsMock();
    this.searchControl = this.formBuilder.control('');

    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    });

    /**
     *O formControl tem uma propriedade chamada valueChanges
     * que ela é um Observable, você pode se inscrever, então toda vida que alguém 
     * digitar um valor, ou seja quando aquele valor mudar, isso vai gerar um evento 
     * e quem estiver inscrito no valueChanges vai receber uma notificação
     **/ 
    // this.searchControl.valueChanges.subscribe(serchTerm => {
    //   console.log(serchTerm);
    // });

    // debounceTime = Espera um determinado tempo para gente digitar
    // distinctUntilChanged = Só vai notificar agente quando realmente um valor mudar ao evento anterior
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .do(searchTerm => console.log(`q=${searchTerm}`))
      .switchMap(serchTerm => this.restaurantService.restaurants(serchTerm))
      .subscribe(restaurants => this.restaurants = restaurants);

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
