import { Component, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../models/comment.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../thread.service';
import { UserPipe } from '../user.pipe';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [NavbarComponent, AsyncPipe, CommentComponent, DatePipe, UserPipe],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.css',
})
export class ThreadComponent {
  constructor(
    private threadService: ThreadService,
    private commentService: CommentService
  ) {}
  comments: Observable<Comment[]> = new Observable<Comment[]>();
  thread: Observable<Thread> = new Observable<Thread>();

  @Input()
  set thread_id(threadId: string) {
    this.commentService.init(threadId);
    this.comments = this.commentService.getComments();
    this.thread = this.threadService.getThread(threadId);
  }
}
