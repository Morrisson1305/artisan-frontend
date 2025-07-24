// artisan-dashboard.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JobService } from '../../../app/services/job.service';
import { BidService } from '../../services/bid.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-artisan-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './artisan-dashboard.component.html',
})
export class ArtisanDashboardComponent implements OnInit {
  private jobService = inject(JobService);
  private bidService = inject(BidService);
  private userService = inject(UserService);

  user: any = null;
  jobs: any[] = [];
  myBids: any[] = [];
  profile: any = {};
  selectedJob: any = null;
  showBidModal = false;
  categoryFilter = 'all';

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.loadDashboardData();
      }
    });
  }

  loadDashboardData() {
    this.jobService.getAllJobs().subscribe(jobs => this.jobs = jobs || []);
    this.bidService.getBidsByUser(this.user.id).subscribe(bids => this.myBids = bids || []);
    this.userService.getProfile(this.user.id).subscribe(profile => this.profile = profile || {});
  }

  get activeBids() {
    return this.myBids.filter(b => b.status === 'pending').length;
  }

  get wonBids() {
    return this.myBids.filter(b => b.status === 'accepted').length;
  }

  get rating() {
    return parseFloat(this.profile?.rating || '0').toFixed(1);
  }

  get earnings() {
    return this.myBids
      .filter(b => b.status === 'accepted')
      .reduce((sum, b) => sum + parseFloat(b.amount || 0), 0);
  }

  get filteredJobs() {
    return this.categoryFilter === 'all'
      ? this.jobs
      : this.jobs.filter(j => j.category === this.categoryFilter);
  }

  placeBid(job: any) {
    this.selectedJob = job;
    this.showBidModal = true;
  }

  closeBidModal() {
    this.showBidModal = false;
    this.selectedJob = null;
  }
}
