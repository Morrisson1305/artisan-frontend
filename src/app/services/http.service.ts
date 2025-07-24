import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  async request<T>(method: string, url: string, data?: any): Promise<T> {
    const res = await firstValueFrom(this.http.request<T>(method, url, {
      body: data,
      withCredentials: true,
      headers: data ? new HttpHeaders({ 'Content-Type': 'application/json' }) : undefined
    }));
    return res;
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url);
  }
}