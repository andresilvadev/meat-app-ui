import { NgModule, Input, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { OrderService } from "app/order/order.service";
import { SnackbarComponent } from "./messages/snackbar/snackbar.component";
import { NotificationService } from "./messages/notification.service";

/**
 * declarations: declaramos os componentes que serão importados
 * imports: Importação de dependencias. Lembre-se que input usa uma sério de diretivas
 * como NgIf, o Radio usa NgFor, o Rating usa compoenentes e diretivas do módulo de formulario
 * então precisamos importar essas coisas para não ter erros nos componentes, então precisamos
 * do FormsModule para trabalhar com os formularios, ReactiveModule por que o nosso compoenente
 * de input usa tanto ngModel quanto formControlName, e vamos precisar do modulo que contém
 * as diretivas básicas, que a gente não importou no modulo rais por que ele já é importado
 * indiretamente pelo BrowserModule que é o nosso CommonModule.
 *
 * Obs: Como esse nosso modulo ele vai ser importado e compartilhado por outros modulos
 * como nosso root module e provavelmente o modulo de compras, precisamos exportar quais os
 * componentes de dentro do nosso modulo que a gente quer que seja utilizado por outros modulos
 *
 * Podemos tbm re-exportar os modulos padrões Ex: CommonModule, FormsModule, ReactiveFormsModule
 * se a gente fizer isso, o módulo que importar nosso modulo compartilhado não vai precisar
 * importar mais esses moduloes padroes.
 */
@NgModule({
  declarations: [
    InputComponent,
    RadioComponent,
    RatingComponent,
    SnackbarComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Importamos os modulos de dependencias
  exports: [
    InputComponent,
    RadioComponent,
    RatingComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SnackbarComponent,
  ],
})
export class SharedModule {
  /**
   * Função statica que chamamos de forRoot, que não vai ter parametro
   * e vai retornar um ModuleWithProvider, que vai retonar um objeto que um deles é
   * o SharedModule e o outro é uma lista de providers.
   * Depois lá no modulo raiz, chama o SharedModule com a função forRoot(), fazendo isso
   * torna nosso core module obsoleto, não sendo mais necessário importa-lo no modulo raiz
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ShoppingCartService,
        RestaurantsService,
        OrderService,
        NotificationService,
      ],
    };
  }
}
