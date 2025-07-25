import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobPostModalComponent } from '../../../app/shared/jobs/job-post-modal.component';
import { Job } from '../../../app/shared/models/job.model';
import { JobStatus } from '../../shared/models/job-staus.enum';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, JobPostModalComponent],
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  user: any;

  jobs$!: Observable<Job[]>;
  notifications$!: Observable<any[]>;
  activeJobs$!: Observable<Job[]>;
  completedJobs$!: Observable<Job[]>;
  totalSpent$!: Observable<number>;

  showJobPostModal = false;

  constructor(private authService: AuthService, private jobService: JobService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.jobs$ = this.jobService.getUserJobs(this.user?.id);
    this.notifications$ = this.jobService.getUserNotifications(this.user?.id); // stub

    this.activeJobs$ = this.jobs$.pipe(
      map(jobs => jobs.filter(job => job.status === JobStatus.OPEN || job.status === JobStatus.ASSIGNED))
    );
    this.completedJobs$ = this.jobs$.pipe(
      map(jobs => jobs.filter(job => job.status === JobStatus.COMPLETED))
    );
    this.totalSpent$ = this.completedJobs$.pipe(
      map(jobs => jobs.reduce((sum, job) => sum + (job.finalAmount || 0), 0))
    );
  }

  openJobModal(): void {
    this.showJobPostModal = true;
  }

  closeJobModal(): void {
    this.showJobPostModal = false;
  }
}
