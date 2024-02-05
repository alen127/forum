import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThreadService } from '../thread.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ThreadPreviewComponent } from '../thread-preview/thread-preview.component';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NavbarComponent, ThreadPreviewComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  constructor(private threadService: ThreadService) {}
  threads: Observable<Thread[]> = new Observable<Thread[]>();

  @Input()
  set category_id(categoryId: string) {
    this.threadService.init(categoryId);
    this.threads = this.threadService.getThreads();
  }
}
