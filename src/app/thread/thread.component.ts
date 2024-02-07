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
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [
    NavbarComponent,
    AsyncPipe,
    CommentComponent,
    DatePipe,
    UserPipe,
    FormsModule,
  ],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.css',
})
export class ThreadComponent {
  comments: Observable<Comment[]> = new Observable<Comment[]>();
  thread: Observable<Thread> = new Observable<Thread>();
  isBeingEdited: boolean = false;
  editedThread: Thread | null = null;
  user: Observable<User | null>;
  editMessage: string = '';
  constructor(
    private threadService: ThreadService,
    private commentService: CommentService,
    private authService: AuthService
  ) {
    this.user = authService.user$;
  }

  @Input()
  set thread_id(threadId: string) {
    this.commentService.init(threadId);
    this.comments = this.commentService.getComments();
    this.thread = this.threadService.getThread(threadId);
  }
  onEdit() {
    this.isBeingEdited = !this.isBeingEdited;
    if (this.isBeingEdited)
      this.thread.subscribe((thread) => (this.editedThread = { ...thread }));
    else this.editedThread = null;
  }
  onSubmit() {
    if (this.editedThread && this.editedThread._id) {
      this.threadService
        .editThread(this.editedThread._id, this.editedThread)
        .subscribe({
          next: (thread) => {
            if (thread && thread._id) {
              this.thread = this.threadService.getThread(thread._id);
              this.isBeingEdited = false;
            }
          },
          error: (err) => {
            this.editMessage = 'Failed to edit thread';
            console.error('Failed to edit thread', err);
          },
        });
    }
  }
}
