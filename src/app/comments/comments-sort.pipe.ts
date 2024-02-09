import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../shared/models/comment.model';

@Pipe({
  name: 'commentsSort',
  standalone: true,
})
export class CommentsSortPipe implements PipeTransform {
  transform(comments: Comment[]): Comment[] {
    return comments.sort((a, b) => {
      if (a.created_at && b.created_at) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
      } else {
        return 0;
      }
    });
  }
}
