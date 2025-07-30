import { Injectable, computed, signal } from '@angular/core';
import { User } from '../../app/shared/models/user.model';
import { AuthStorageService } from './auth-storage.service';
import { LoginPayload } from '../../app/shared/models/login.model';
import { RegisterPayload } from '../shared/models/registration.model';
import { VerifyOtpPayload } from '../shared/models/verifyotpPayload.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment.prod';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<User | null>(null);
  private isLoading = signal(true);
  private baseUrl = environment.baseUrl;

  constructor(
    private authStorage: AuthStorageService,
    private http: HttpClient
  ) {
    const stored = this.authStorage.getUser();
    const token = this.authStorage.getAccessToken();
    
     if (token && !this.authStorage.isTokenExpired(token)) {
    this.user.set(stored);
  } else {
    this.authStorage.clear();
    this.user.set(null);
  }

  this.isLoading.set(false);
  }

  login(credentials: { phone: string; password: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/auth/login`, credentials);
}

  verifyLoginOtp(payload: { phone: string; otp: string }): Observable<{ user: User; accessToken: string; refreshToken: string }> {
  return this.http.post<{ user: User; accessToken: string; refreshToken: string }>(
    `${this.baseUrl}/auth/login/verify`,
    payload
  ).pipe(
    tap(res => {
      this.authStorage.setUser(res.user);
      this.authStorage.setTokens(res.accessToken, res.refreshToken);
      this.user.set(res.user);  
    })
  );
}


  register(data: RegisterPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/register`, data);
  }

  verifyOtp(data: VerifyOtpPayload): Observable<{ message: string }> {
  return this.http.post<{ message: string }>(
    `${this.baseUrl}/auth/verify-otp`,
    data
  );
}

  resendOtp(data: { phone: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/resend-otp`, data);
  }

  logout() {
    this.authStorage.clear();
    this.user.set(null);
  }

  get authState() {
    return computed(() => ({
      user: this.user(),
      isAuthenticated: !!this.user(),
      isLoading: this.isLoading()
    }));
  }

  getUser(): User | null {
    return this.user();
  }

  getAccessToken(): string | null {
    return this.authStorage.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this.authStorage.getRefreshToken();
  }
}
