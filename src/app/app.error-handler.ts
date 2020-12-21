import { HttpErrorResponse } from "@angular/common/http";
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
  static handleError(error: HttpErrorResponse | any) {
    let errorMessage: string;    

    if (error instanceof HttpErrorResponse) {
      const body = error.error;
      errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText || ''} ${body}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.log(errorMessage);

    return Observable.throw(errorMessage);
  }
}
