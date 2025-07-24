import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-post-modal',
  imports: [],
  templateUrl: './job-post-modal.component.html',
  styleUrl: './job-post-modal.component.scss'
})
export class JobPostModalComponent {

  form: FormGroup;
  showOtp = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      title: [''],
      category: [''],
      description: [''],
      budgetMin: [''],
      budgetMax: [''],
      timeline: [''],
      location: [''],
    });
  }

  openOtpModal() {
    const dialogRef = this.dialog.open(OtpModalComponent, {
      data: {
        phone: '08012345678', // Replace with user.phone
        type: 'job_posting'
      }
    });

    dialogRef.componentInstance.verified.subscribe(() => {
      this.postJob();
    });
  }

  postJob() {
    this.http.post('/api/jobs', this.form.value).subscribe(() => {
      alert('Job posted'); // Replace with toast
    });
  }

  handleSubmit() {
    this.openOtpModal();
  }
}

