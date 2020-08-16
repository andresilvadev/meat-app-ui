import { NgModule } from "@angular/core";
import { AboutComponent } from "./about.component";
import { Routes, RouterModule } from "@angular/router";

// Constante que recebe nossas rotas
const ROUTES: Routes = [{ path: "", component: AboutComponent }];

/**
 * Criamos a classe que vai representar nosso módulo
 * Importamos o decorator NgModule e declarar as propriedades do modulo
 * declarations: Lista todos os componentes que a gente deve ter dentro do módulo
 * imports: Lista dos módulos que serão importados
 * exports: Lista dos módulos a serem visiveis a toda aplicação
 * providers: Quando necessitamos usar algum serviço
 */
@NgModule({
  declarations: [AboutComponent],
  imports: [RouterModule.forChild(ROUTES)], // Igual no modulo raiz devemos importar as rotas, usando forChild por este módulo ser um módulo filho
  exports: [],
  providers: [],
})
export class AboutModule {}
