import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getAuthToken();
  if (authToken) {
    const newReq = req.clone({ params: req.params.set("token", authToken) });
    return next(newReq);
  }
  return next(req);
};
