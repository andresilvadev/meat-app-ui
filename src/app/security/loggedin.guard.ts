import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) {}

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggeIn();
    
    if(!loggedIn) {
      this.loginService.handleLogin(`/${path}`);
    }

    console.log(path);

    return loggedIn;  
  }

  canLoad(route: Route): boolean {
    console.log('canLoad');
    return this.checkAuthentication(route.path);
  }

  /**
   * ActivatedRouteSnapshot representa a rota ativada, ou seja é uma cópia da rota que 
   * foi ativada, aqui é basicamente uma foto do objeto activatedRoute.
   * RouterStateSnapshot é uma arvore de ActivatedRouteSnapshot, ele vai ter todo o caminho 
   * de todas as rotas que foram ativadas até chegar a nossa rota
   * @param activadedRoute 
   * @param routeState 
   */
  canActivate(activadedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): boolean {
    console.log('canActivate');
    return this.checkAuthentication(activadedRoute.routeConfig.path);
  }

}