import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ThreadPreviewComponent } from '../../threads/thread-preview/thread-preview.component';
import { Thread } from '../../shared/models/thread.model';
import { User } from '../../shared/models/user.model';
import { ThreadService } from '../../threads/thread.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NavbarComponent,
    ThreadPreviewComponent,
    FormsModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  threads: Observable<Thread[]> = new Observable<Thread[]>();
  user: Observable<User | null>;
  isAdding: boolean = false;
  newThread: Partial<Thread> = {};
  addThreadMessage: string = '';
  constructor(
    private threadService: ThreadService,
    private authService: AuthService
  ) {
    this.user = authService.user$;
  }

  @Input()
  set category_id(categoryId: string) {
    this.threadService.loadThreadsForCategory(categoryId);
    this.threads = this.threadService.threads$;
    this.newThread.category_id = categoryId;
  }
  onSubmit() {
    this.user.subscribe({
      next: (user) => {
        if (user && user._id) {
          this.newThread.user_id = user._id;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.threadService.addThread(this.newThread as Thread).subscribe({
      next: () => {
        this.isAdding = false;
        this.newThread = {};
      },
      error: (err) => {
        this.addThreadMessage = 'Failed to add thread';
        console.error(err);
      },
    });
  }
}
