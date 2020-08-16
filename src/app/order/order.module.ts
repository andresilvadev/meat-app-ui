import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { Routes, RouterModule } from "@angular/router";

const ROUTES: Routes = [{ path: "", component: OrderComponent }];

/**
 * Obs: Como os componentes Items de Compra e Custo de entrega, são utilizados
 * apenas dentro desse modulo, a gente não precisa exportar.
 */
@NgModule({
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)],
  exports: [],
  providers: [],
})
export class OrderModule {}
