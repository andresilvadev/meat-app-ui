import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

import { MEAT_API } from "app/app.api";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

  user: User;

  constructor(
    private http: HttpClient, 
    private router: Router
    ) {}

  isLoggeIn(): boolean {
    return this.user !== undefined
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${MEAT_API}/login`, {
      email: email, 
      password: password
    }).do(user => this.user = user)
  }

  handleLogin(path?: string) {
    this.router.navigate(['/login', btoa(path)]);
  }

}