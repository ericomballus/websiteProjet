import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserToken } from '../models/user-token';
import { User } from '../models/userModel';
import { SaveRandomService } from './save-random.service';
import { UrlService } from './url.service';
export interface UserCredential {
  email?: string;
  password?: string;
}

export interface AuthenticationServerResponse {
  token?: any;
  credentials?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private tokenSubject: BehaviorSubject<UserToken>;
  public token: Observable<UserToken>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private urlService: UrlService,
    private saveRandom: SaveRandomService
  ) {
    let store: any = localStorage.getItem('user-token');
    let tok = JSON.parse(store);

    this.tokenSubject = new BehaviorSubject<UserToken>(tok);
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): UserToken {
    return this.tokenSubject.value;
  }

  saveToken(token: any) {
    localStorage.setItem('user-token', JSON.stringify(token));
    this.tokenSubject.next(token);
  }

  login(data: UserCredential) {
    return this.http
      .post<UserToken>(`${this.urlService.getUrl()}/user/login`, data)
      .pipe(
        map((res: AuthenticationServerResponse) => {
          this.saveRandom.setUser(res.credentials);
          const userToken: UserToken = res.token;
          localStorage.setItem('user-token', JSON.stringify(userToken));
          this.tokenSubject.next(userToken);

          return userToken;
        })
      );
  }

  logout() {
    localStorage.removeItem('user-token');
    let token: any = JSON.parse(localStorage.getItem('user-token') || '');
    this.tokenSubject.next(token);
    this.router.navigate(['/']);
  }
  createdUser() {}
}
