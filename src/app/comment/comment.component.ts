import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { UserPipe } from '../user.pipe';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, UserPipe, AsyncPipe, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() comment: Comment | null = null;
  user: Observable<User | null>;
  editedComment: Comment | null = null;
  isBeingEdited: boolean = false;
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) {
    this.user = authService.user$;
  }

  onBeginEdit() {
    if (this.comment) {
      this.editedComment = { ...this.comment };
      this.editedComment.created_at = new Date();
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
  onEdit() {
    if (this.editedComment) {
      this.commentService.editComment(this.editedComment).subscribe({
        next: () => {
          this.isBeingEdited = false;
          this.errorMessage = '';
        },
        error: (err) => {
          console.log('Failed to edit comment', err);
          this.errorMessage = 'Failed to edit comment';
        },
      });
    }
  }
  onDelete() {
    if (this.comment && this.comment._id) {
      this.commentService.deleteComment(this.comment._id).subscribe({
        next: () => {
          if (this.comment)
            this.commentService.loadComments(this.comment.thread_id);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    }
  }
}
