// src/app/services/bid.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bid } from '../../app/shared/models/bid.model';

@Injectable({ providedIn: 'root' })
export class BidService {
  private readonly baseUrl = '/api/bids';

  constructor(private http: HttpClient) {}

  getBidsByJob(jobId: string): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${this.baseUrl}/job/${jobId}`);
  }

  getBidsByUser(userId: string): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${this.baseUrl}/user/${userId}`);
  }

  createBid(bid: Partial<Bid>): Observable<Bid> {
    return this.http.post<Bid>(`${this.baseUrl}`, bid);
  }

  acceptBid(bidId: string, otpCode: string): Observable<Bid> {
    return this.http.post<Bid>(`${this.baseUrl}/${bidId}/accept`, { code: otpCode });
  }
}
