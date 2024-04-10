import { Component, Input } from "@angular/core";
import { AsyncPipe, DatePipe, NgIf } from "@angular/common";
import { Observable } from "rxjs";
import { ThreadService } from "../thread.service";
import { FormsModule } from "@angular/forms";
import { Thread } from "../../shared/models/thread.model";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CommentComponent } from "../../comments/comment/comment.component";
import { UserPipe } from "../../shared/user.pipe";
import { CommentsSortPipe } from "../../comments/comments-sort.pipe";
import { CommentService } from "../../comments/comment.service";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../shared/models/user.model";
import { Comment } from "../../shared/models/comment.model";

@Component({
  selector: "app-thread",
  standalone: true,
  imports: [
    NavbarComponent,
    AsyncPipe,
    CommentComponent,
    DatePipe,
    UserPipe,
    FormsModule,
    CommentsSortPipe,
  ],
  templateUrl: "./thread.component.html",
  styleUrl: "./thread.component.css",
})
export class ThreadComponent {
  comments: Observable<Comment[]>;
  thread: Observable<Thread> = new Observable<Thread>();
  isBeingEdited: boolean = false;
  editedThread: Thread | null = null;
  user: Observable<User | null>;
  editMessage: string = "";
  newComment: Partial<Comment> = {};
  newCommentMessage: string = "";
  constructor(
    private threadService: ThreadService,
    private commentService: CommentService,
    private authService: AuthService,
  ) {
    this.user = authService.user$;
    this.comments = commentService.comments$;
  }

  @Input()
  set thread_id(threadId: string) {
    this.commentService.loadComments(threadId);
    this.thread = this.threadService.getThread(threadId);
    this.newComment.thread_id = threadId;
    this.user.subscribe((user) => {
      if (user) this.newComment.user_id = user._id;
    });
  }
  onBeginEdit() {
    this.thread.subscribe((thread) => {
      this.editedThread = { ...thread };
      this.editedThread.created_at = new Date();
    });
    this.isBeingEdited = !this.isBeingEdited;
  }
  onEdit() {
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
            this.editMessage = "Failed to edit thread";
            console.error("Failed to edit thread", err);
          },
        });
    }
  }
  onCommentSubmit() {
    this.commentService.addComment(this.newComment as Comment).subscribe({
      next: () => {
        this.newCommentMessage = "";
        this.newComment.content = "";
      },
      error: (err) => {
        this.newCommentMessage = "Failed to add new comment.";
        console.error("Failed to add new comment", err);
      },
    });
  }
}
