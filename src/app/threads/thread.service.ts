import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, catchError, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Thread } from "../shared/models/thread.model";

@Injectable({
  providedIn: "root",
})
export class ThreadService {
  private categoryUrl = environment.apiUrl + "/categories/";
  private threadUrl = environment.apiUrl + "/threads/";
  private threadsSubject = new BehaviorSubject<Thread[]>([]);
  threads$ = this.threadsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadThreadsForCategory(categoryId: string) {
    this.http
      .get<Thread[]>(this.categoryUrl + categoryId + "/threads")
      .subscribe({
        next: (threads) => this.threadsSubject.next(threads),
        error: (err) => {
          console.error("Failed to get threads", err);
          this.threadsSubject.next([]);
        },
      });
  }
  getThread(id: string) {
    return this.http.get<Thread>(this.threadUrl + id);
  }
  addThread(thread: Thread) {
    return this.http.post<Thread>(this.threadUrl, thread).pipe(
      tap((thread) => this.loadThreadsForCategory(thread.category_id)),
      catchError((err) => {
        console.error("Failed to add thread", err);
        return of(null);
      }),
    );
  }
  deleteThread(id: string) {
    return this.http.delete(`${this.threadUrl}/${id}`);
  }

  editThread(id: string, thread: Thread) {
    return this.http.patch<Thread>(`${this.threadUrl}/${id}`, thread).pipe(
      catchError((error) => {
        console.error("Failed to update thread", error);
        return of(null);
      }),
    );
  }
}
