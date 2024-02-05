import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = environment.apiUrl + '/users';
  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }
}
