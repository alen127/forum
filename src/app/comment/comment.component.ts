import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { UserPipe } from '../user.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, UserPipe, AsyncPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() comment: Comment | null = null;
}
