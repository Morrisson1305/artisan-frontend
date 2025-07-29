// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../app/shared/models/job.model';
import { environment } from '../../../environment.prod';

@Injectable({ providedIn: 'root' })
export class JobService {
  //private readonly baseUrl = '/api/jobs';
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}`);
  }

  getUserJobs(userId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/my`, { params: { userId } });
  }

  getUserNotifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/notifications`, { params: { userId } }); // stubbed
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

  createJob(job: Partial<Job>, otpCode: string): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}`, { ...job, code: otpCode });
  }

  updateJobStatus(jobId: string, status: string): Observable<Job> {
    return this.http.patch<Job>(`${this.baseUrl}/${jobId}/status`, { status });
  }
}
