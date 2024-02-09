import { Pipe, PipeTransform, inject } from '@angular/core';
import { UserService } from '../auth/user.service';
import { map } from 'rxjs';

@Pipe({
  name: 'user',
  standalone: true,
})
export class UserPipe implements PipeTransform {
  userService = inject(UserService);
  transform(id: string) {
    return this.userService.getUser(id).pipe(map((user) => user.username));
  }
}
