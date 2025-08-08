import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../../services/job.service';
import { ToastService } from '../../../services/toast.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { catchError, of } from 'rxjs';
import { FiveDigitOtpModalComponent } from '../../../shared/modals/5digit-otp/five-digit-otp-modal.component';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent {

  form: FormGroup;
  submitting = signal(false);

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private toast: ToastService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      minBudget: [null, [Validators.required, Validators.min(1)]],
      maxBudget: [null, [Validators.required, Validators.min(1)]],
      priority: ['low', Validators.required],
    });
  }

   onSubmit(): void {
  if (this.form.invalid) {
    this.toast.warning('Please fill in all required fields');
    return;
  }

  const user = this.authService.getUser() as any;
  if (!user) {
    this.toast.error('User not authenticated');
    return;
  }

  const payload = {
    ...this.form.value,
    userId: user._id 
  };

  this.submitting.set(true);

  this.jobService.createJob(payload)
    .pipe(
      catchError((err) => {
        this.submitting.set(false);
        this.toast.error(err?.error?.message || 'Failed to create job');
        return of(null);
      })
    )
    .subscribe((res: any) => {
      this.submitting.set(false);

      if (res?.job) {
        this.toast.success('Job created successfully. Please verify with OTP.');

        const dialogRef = this.dialog.open(FiveDigitOtpModalComponent, {
          disableClose: true,
          width: '700px',
          data: {
              phone: user.phone,
              type: 'job',
              jobId: res.job._id
            }
        });

        const instance = dialogRef.componentInstance as FiveDigitOtpModalComponent;

        instance.verified.subscribe(() => {
          this.toast.success('Your job has been verified.');
        });

        instance.showToast.subscribe((msg: string) => {
          this.toast.show(msg);
        });
      }
    });
}

  onCancel(): void {
  this.form.reset();
  this.toast.warning('Job posting cancelled');
}

  }








