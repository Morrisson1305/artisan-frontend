import { JobPriority, JobStatus } from './job-staus.enum'

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  status: JobStatus;
  category: string;
  priority: JobPriority;
  minBudget: number;
  maxBudget: number;
  finalAmount?: number;
  createdAt: string; 
  bidCount?: number; 
}
