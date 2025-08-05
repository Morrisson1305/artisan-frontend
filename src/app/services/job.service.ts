// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../app/shared/models/job.model';
import { environment } from '../../../environment.prod';

@Injectable({ providedIn: 'root' })
export class JobService {

  private baseUrl = `${environment.baseUrl}/jobs`;

  constructor(private http: HttpClient) {}

  getJobs(filters: { status?: string, category?: string } = {}): Observable<Job[]> {
    let params = new HttpParams();
    if (filters.status) params = params.set('status', filters.status);
    if (filters.category) params = params.set('category', filters.category);
    return this.http.get<Job[]>(this.baseUrl, { params });
  }


  getJobById(jobId: string): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${jobId}`);
  }


  getUserJobs(userId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/user/${userId}`);
  }


  createJob(job: Partial<Job>): Observable<any> {
    return this.http.post(`${this.baseUrl}`, job);
  }


  verifyJobOTP(data: { phone: string, jobId: string, otp: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-otp`, data);
  }


  updateJob(jobId: string, updates: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/${jobId}`, updates);
  }


  deleteJob(jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${jobId}`);
  }


  updateJobStatus(jobId: string, status: string): Observable<Job> {
    return this.http.patch<Job>(`${this.baseUrl}/${jobId}/status`, { status });
  }


  acceptBid(data: {
    jobId: string,
    bidId: string,
    artisanId: string,
    finalAmount: number
  }): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}/accept-bid`, data);
  }


  getBidsForJob(jobId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${jobId}/bids`);
  }

}