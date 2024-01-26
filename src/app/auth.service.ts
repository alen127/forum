import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject({});
  public user: Observable<User> = new Observable();
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }
}
