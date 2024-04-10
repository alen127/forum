import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Comment } from "../shared/models/comment.model";
import { BehaviorSubject, catchError, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private threadUrl = environment.apiUrl + "/threads";
  private commentUrl = environment.apiUrl + "/comments";
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadComments(threadId: string) {
    this.http
      .get<Comment[]>(this.threadUrl + `/${threadId}/comments`)
      .subscribe({
        next: (comments) => {
          console.log(comments);
          this.commentsSubject.next(comments);
        },
        error: (err) => {
          console.error(err);
          this.commentsSubject.next([]);
          return of(null);
        },
      });
  }
  addComment(comment: Comment) {
    return this.http.post<Comment>(this.commentUrl, comment).pipe(
      tap(() => {
        this.loadComments(comment.thread_id);
      }),
      catchError((err) => {
        console.error("Error adding comment", err);
        return of(null);
      }),
    );
  }
  editComment(comment: Comment) {
    return this.http
      .patch<Comment>(`${this.commentUrl}/${comment._id}`, comment)
      .pipe(
        tap(() => {
          this.loadComments(comment.thread_id);
        }),
        catchError((err) => {
          console.error("Failed to edit comment", err);
          return of(null);
        }),
      );
  }
  deleteComment(id: string) {
    return this.http.delete<{ message: string }>(`${this.commentUrl}/${id}`);
  }
}
