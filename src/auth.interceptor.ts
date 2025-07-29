import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthStorageService } from './app/services/auth-storage.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../environment.prod';


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authStorage = inject(AuthStorageService);
  const http = inject(HttpClient);
  const accessToken = authStorage.getAccessToken();
  const baseUrl = environment.baseUrl;

  let authReq = req;

  if (accessToken &&!authStorage.isTokenExpired(accessToken)) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
      // If request is not a 401, or no refresh token is available, just throw
      if (error.status !== 401 || !authStorage.getRefreshToken()) {
        return throwError(() => error);
      }

      const refreshToken = authStorage.getRefreshToken();

      // Attempt to refresh token
      return http.post<{ accessToken: string; refreshToken: string }>(
        `${baseUrl}/auth/refresh-token`,
        { refreshToken }
      ).pipe(
        switchMap(response => {
          // Store new tokens
          authStorage.setTokens(response.accessToken, response.refreshToken);

          // Retry original request with new access token
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });
          return next(retryReq);
        }),
        catchError(refreshError => {
          // If refresh fails, clear storage
          authStorage.clear();
          return throwError(() => refreshError);
        })
      );
    })
  );
  }

