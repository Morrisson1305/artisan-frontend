import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Job } from '../../../app/shared/models/job.model';
import { JobStatus } from '../../shared/models/job-staus.enum';
import { TimeAgoPipe } from '../../shared/pipe/time-ago.pipe';
import { MatDialog } from '@angular/material/dialog';
import { FiveDigitOtpModalComponent } from '../../shared/modals/5digit-otp/five-digit-otp-modal.component';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TimeAgoPipe],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
 
  user: any;
  JobStatus = JobStatus;
  isOnDashboardRootRoute = false;

  jobs$!: Observable<Job[]>;
  activeJobs$!: Observable<Job[]>;
  completedJobs$!: Observable<Job[]>;
  totalSpent$!: Observable<number>;

  showJobPostModal = false;

  activeTab: 'jobs' | 'bids' = 'jobs';

    selectedJobWithBids: {
    title: string;
    bids: {
      artisanName: string;
      amount: number;
      estimatedTime: string;
    }[];
  } | null = null;

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private dialog: MatDialog,
    private toast: ToastService,
    private router: Router
  ) {
     this.router.events.subscribe(() => {
    this.isOnDashboardRootRoute = this.router.url === '/user-dashboard';
  });
  }

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

    loadBidsForFirstJob(): void {
    this.jobs$.pipe(
      map(jobs => jobs[0]),
      switchMap(firstJob => {
        if (!firstJob) return of(null);
        return this.jobService.getBidsForJob(firstJob.id).pipe(
          map(bids => ({
            title: firstJob.title,
            bids: bids.map(bid => ({
              artisanName: bid.artisanName || 'Artisan',
              amount: bid.amount,
              estimatedTime: bid.estimatedTime || 'N/A',
            })),
          }))
        );
      })
    ).subscribe(result => {
      this.selectedJobWithBids = result;
    });
  }

  setActiveTab(tab: 'jobs' | 'bids') {
    this.activeTab = tab;
    if (tab === 'bids') {
      this.loadBidsForFirstJob();
    }
  }

    acceptBid(bid: any) {
    console.log('Accept bid', bid);
  }

  rejectBid(bid: any) {
    console.log('Reject bid', bid);
  }

  openJobModal(): void {
  const dialogRef = this.dialog.open(FiveDigitOtpModalComponent, {
    width: '800px',
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.jobs$ = this.jobService.getUserJobs(this.user.id);
    }
  });
}



  closeJobModal(): void {
    this.showJobPostModal = false;
  }


}