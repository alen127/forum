import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ThreadService } from '../thread.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserPipe } from '../../shared/user.pipe';
import { AuthService } from '../../auth/auth.service';
import { Thread } from '../../shared/models/thread.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-thread-preview',
  standalone: true,
  imports: [RouterLink, DatePipe, UserPipe, AsyncPipe, FormsModule],
  templateUrl: './thread-preview.component.html',
  styleUrl: './thread-preview.component.css',
})
export class ThreadPreviewComponent {
  @Input() thread: Thread | null = null;
  user: Observable<User | null>;
  constructor(
    private threadService: ThreadService,
    private authService: AuthService
  ) {
    this.user = authService.user$;
  }

  onDelete() {
    if (this.thread && this.thread._id) {
      this.threadService.deleteThread(this.thread._id).subscribe({
        next: () => {
          if (this.thread) {
            this.threadService.loadThreadsForCategory(this.thread.category_id);
          }
        },
        error: (err) => {
          console.log('Failed to delete thread', err);
        },
      });
    }
  }
}
