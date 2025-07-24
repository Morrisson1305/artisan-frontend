// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../app/shared/models/user.model';
import { Artisan } from '../../app/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUser(): Observable<User | null> {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return of(user);
  }

  getProfile(userId: string): Observable<Artisan | User> {
    return this.http.get<Artisan | User>(`/api/artisan/${userId}`);
  }
}
