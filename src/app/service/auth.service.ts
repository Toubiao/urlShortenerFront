import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import * as moment from "moment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDto} from "../model/login-dto";
import {Observable, shareReplay, tap} from "rxjs";


const LOGIN_API = environment.apiUrl.concat('/auth/login');
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(loginDTO: LoginDto): Observable<any> {
    this.logout();
    const headers = new HttpHeaders( {
      'Authorization' : 'Basic ' + btoa(loginDTO.username + ':' + loginDTO.password)
    } );
    return this.http.post<any>(LOGIN_API,{},{headers}).pipe(tap(value => this.setSession(value)), shareReplay(1));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    let expiresAt: string | null = null;


      if (expiration !== null) {
        expiresAt = JSON.parse(expiration);
      }

    return moment(expiresAt);
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(1,"hours");

    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
}
