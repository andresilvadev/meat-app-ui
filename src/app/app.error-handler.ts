import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

/**
 *
 */
export class ErrorHandler {
  /**
   * Método statico que recebe um objeto do tipo Response ou qualquer um
   * verifica se o erro é uma instancia de Response
   * e retorna um Observable
   */
  static handleError(error: Response | any) {
    let errorMessage: string;

    if (error instanceof Response) {
      errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`;
    } else {
      errorMessage = error.toString();
    }

    console.log(errorMessage);

    return Observable.throw(errorMessage);
  }
}
