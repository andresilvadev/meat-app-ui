import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { MEAT_API } from "app/app.api";
import { User } from "./user.model";
import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class LoginService {

  user: User;
  lastUrl: string;

  constructor(
    private http: HttpClient, 
    private router: Router
    ) {
      this.router.events.filter(ev => ev instanceof NavigationEnd ).subscribe((ev: NavigationEnd) => this.lastUrl = ev.url );
    }

  isLoggeIn(): boolean {
    return this.user !== undefined
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${MEAT_API}/login`, {
      email: email, 
      password: password
    }).do(user => this.user = user)
  }

  logout() {
    this.user = undefined
  }

  /**
   * Se ninguém passar nenhum parametro pega a ultima url como default
   * @param path 
   */
  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }

}