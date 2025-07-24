import { JobStatus } from './job-staus.enum'
export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  userId: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  finalAmount?: number;
}
