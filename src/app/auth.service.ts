import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private token: string | null = null;
  user$ = this.userSubject.asObservable();
  constructor(private http: HttpClient) {}

  whoAmI() {
    return this.http.get<User>(`${environment.apiUrl}/auth/me`).pipe(
      tap((response: any) => {
        if (response && !response.message) {
          this.userSubject.next(response.user);
        }
      }),
      catchError((error: any) => {
        this.logout();
        return of(null);
      })
    );
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, user);
  }
  login(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, user).pipe(
      tap((res: any) => {
        this.token = res.accessToken;
        localStorage.setItem('token', res.accessToken);
        this.userSubject.next(res.user);
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.userSubject.next(null);
  }

  getAuthToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isAdmin() {
    const user = this.userSubject.getValue();
    if (user && user.role === 'admin') {
      return true;
    }
    return false;
  }
}
