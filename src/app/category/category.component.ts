import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThreadService } from '../thread.service';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ThreadPreviewComponent } from '../thread-preview/thread-preview.component';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread.model';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';

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
