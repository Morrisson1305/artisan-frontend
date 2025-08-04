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
      if (error.status !== 401 || !authStorage.getRefreshToken()) {
        return throwError(() => error);
      }

      const refreshToken = authStorage.getRefreshToken();
      return http.post<{ accessToken: string; refreshToken: string }>(
        `${baseUrl}/auth/refresh-token`,
        { refreshToken }
      ).pipe(
        switchMap(response => {
          authStorage.setTokens(response.accessToken, response.refreshToken);
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });
          return next(retryReq);
        }),
        catchError(refreshError => {
          authStorage.clear();
          return throwError(() => refreshError);
        })
      );
    })
  );
  }

