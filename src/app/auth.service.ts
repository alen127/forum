import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private token: string | null = null;
  public user: Observable<User> = new Observable();
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }
  login(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/login`, user).pipe(
      tap((res: any) => {
        this.token = res.accessToken;
        localStorage.setItem('token', res.accessToken);
        this.userSubject.next(res.user);
      })
    );
  }

  getAuthToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  whoAmI() {
    if (this.getAuthToken()) {
      return this.http
        .get(`${environment.apiUrl}/auth/me`)
        .pipe(tap((res) => console.log(res)));
    }
    return new Observable((observer) => observer.next({ status: 100 }));
  }
}
