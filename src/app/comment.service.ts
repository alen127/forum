import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Comment } from './models/comment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private threadUrl = environment.apiUrl + '/threads';

  private commentSubject = new BehaviorSubject<Comment[]>([]);

  constructor(private http: HttpClient) {}

  public init(id: string) {
    return this.http
      .get<Comment[]>(this.threadUrl + `/${id}/comments`)
      .subscribe((threads) => this.commentSubject.next(threads));
  }
  public getComments() {
    return this.commentSubject.asObservable();
  }
}
