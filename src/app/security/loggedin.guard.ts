import { Injectable } from "@angular/core";
import { CanLoad, Route } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad {

  constructor(private loginService: LoginService) {}

  canLoad(route: Route): boolean {
    const loggedIn = this.loginService.isLoggeIn();
    
    if(!loggedIn) {
      this.loginService.handleLogin(`/${route.path}`);
    }

    console.log(route);

    return loggedIn;    
  }

}