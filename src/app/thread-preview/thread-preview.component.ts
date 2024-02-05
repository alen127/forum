import { Component, Input } from '@angular/core';
import { Thread } from '../models/thread.model';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { UserPipe } from '../user.pipe';

@Component({
  selector: 'app-thread-preview',
  standalone: true,
  imports: [RouterLink, DatePipe, UserPipe, AsyncPipe],
  templateUrl: './thread-preview.component.html',
  styleUrl: './thread-preview.component.css',
})
export class ThreadPreviewComponent {
  @Input() thread: Thread | null = null;
}
