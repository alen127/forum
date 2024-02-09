import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.whoAmI().pipe(
    map((v) => !!v),
    tap((v) => {
      if (!v) router.navigate(['login']);
    })
  );
};
