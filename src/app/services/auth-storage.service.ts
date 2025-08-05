
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../app/shared/models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private readonly userKey = 'auth_user';
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private isBrowser: boolean;

   constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


    getUser(): User | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

 
  setUser(user: User) {
    if (!this.isBrowser) return;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

 
  setTokens(accessToken: string, refreshToken: string) {
    if (!this.isBrowser) return;
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  
  getAccessToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.accessTokenKey);
  }


  getRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.refreshTokenKey);
  }

 
  clear() {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

   isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp < now;
    } catch (e) {
      return true;
    }
  }
}
