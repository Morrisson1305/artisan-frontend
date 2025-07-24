
import { Injectable } from '@angular/core';
import { User } from '../../app/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private readonly userKey = 'auth_user';
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';


  getUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

 
  setUser(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

 
  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

 
  clear() {
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
