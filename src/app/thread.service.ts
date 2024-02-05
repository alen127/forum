import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Thread } from './models/thread.model';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private categoryUrl = environment.apiUrl + '/categories/';
  private threadUrl = environment.apiUrl + '/threads/';

  private threadSubject = new BehaviorSubject<Thread[]>([]);

  constructor(private http: HttpClient) {}

  public init(id: string) {
    return this.http
      .get<Thread[]>(this.categoryUrl + id + '/threads')
      .subscribe((threads) => this.threadSubject.next(threads));
  }
  public getThreads() {
    return this.threadSubject.asObservable();
  }
  public getThread(id: string) {
    return this.http.get<Thread>(this.threadUrl + id);
  }
}
