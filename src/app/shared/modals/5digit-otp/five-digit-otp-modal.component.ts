import { Component, EventEmitter, Inject, OnDestroy, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { JobService } from '../../../services/job.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-five-digit-otp-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOtpInputModule],
  templateUrl: './five-digit-otp-modal.component.html',
  styleUrls: ['./five-digit-otp-modal.component.scss']
})
export class FiveDigitOtpModalComponent implements OnDestroy {

  @Output() verified = new EventEmitter<void>();
  @Output() showToast = new EventEmitter<string>();

  otpCode = '';
  countdown = 300;
  canResend = false;
  timerSub!: Subscription;
  isSubmitting = signal(false);


  config = {
    length: 5,
    inputClass: 'otp-input',
    allowNumbersOnly: true,
    isPasswordInput: false,
    autofocus: true,
    placeholder: ''
  };

  constructor(
    private jobService: JobService,
    private toast: ToastService,
    public dialogRef: MatDialogRef<FiveDigitOtpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { phone: string, type: string, jobId: string }
  ) {
    this.startTimer();
  }

  private startTimer(): void {
    this.countdown = 300;
    this.canResend = false;
    this.timerSub?.unsubscribe();
    this.timerSub = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.canResend = true;
        this.timerSub.unsubscribe();
      }
    });
  }

  onOtpChange(otp: string): void {
    this.otpCode = otp;
  }

  handleSubmit(): void {
    if (!this.otpCode || this.otpCode.length !== 5) {
      this.toast.warning('Please enter the 5-digit OTP code');
      return;
    }
     this.isSubmitting.set(true);

    const payload = {
      phone: this.data.phone,
      jobId: this.data.jobId,
      otp: this.otpCode
    };

    this.jobService.verifyJobOTP(payload).subscribe({
      next: () => {
        this.toast.success('OTP verification successful');
        this.isSubmitting.set(false);
        this.verified.emit();
        this.dialogRef.close();
      },
      error: (err) => {
        const message = err?.error?.message || 'Invalid or expired OTP';
        this.toast.error(message);
        this.showToast.emit(message);
        this.isSubmitting.set(false);
      }
    });
  }

  // handleResend(): void {
  //   if (!this.canResend) return;

  //   const payload = {
  //     phone: this.data.phone,
  //     jobId: this.data.jobId
  //   };

  //   this.jobService.resendJobOtp(payload).subscribe({
  //     next: () => {
  //       this.toast.success('OTP resent successfully');
  //       this.startTimer(); // restart countdown
  //     },
  //     error: () => {
  //       this.toast.error('Failed to resend OTP');
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  get phone(): string {
    return this.data.phone;
  }

}
