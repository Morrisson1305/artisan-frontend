import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
//import { JobPostModalComponent } from '../../../app/shared/jobs/job-post-modal.component';
import { Job } from '../../../app/shared/models/job.model';
import { JobStatus } from '../../shared/models/job-staus.enum';
import { NavbarComponent } from '../pages/dashboard/navbar/navbar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent], //JobPostModalComponent
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  user: any;
  JobStatus = JobStatus; 

  jobs$!: Observable<Job[]>;
  activeJobs$!: Observable<Job[]>;
  completedJobs$!: Observable<Job[]>;
  totalSpent$!: Observable<number>;

  showJobPostModal = false;

  constructor(
    private authService: AuthService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    const userId = this.user?.id;

    if (!userId) return;

    this.jobs$ = this.jobService.getUserJobs(userId);

    this.activeJobs$ = this.jobs$.pipe(
      map(jobs =>
        jobs.filter(
          job =>
            job.status === JobStatus.OPEN || job.status === JobStatus.ASSIGNED
        )
      )
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
