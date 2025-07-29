import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { NgOtpInputModule } from 'ng-otp-input';
import { environment } from '../../../../environment.prod';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOtpInputModule],
  templateUrl: './otp-modal.component.html'
})
export class OtpModalComponent implements OnDestroy {
  @Input() phone!: string;
  @Input() type!: string;

  @Output() verified = new EventEmitter<void>();
  @Output() showToast = new EventEmitter<string>();

  otpCode = '';
  countdown = 60;
  canResend = false;
  timerSub!: Subscription;
  private baseUrl = environment.baseUrl;

  config = {
    length: 6,
    inputClass: 'otp-input',
    allowNumbersOnly: true,
    isPasswordInput: false,
    autofocus: true,
    placeholder: ''
  };

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<OtpModalComponent>
  ) {
    this.startTimer();
  }

  private startTimer(): void {
    this.countdown = 60;
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
    if (this.otpCode.length !== 6) {
      this.showToast.emit('Please enter the full 6-digit OTP');
      return;
    }

    this.authService.verifyOtp({
      phone: this.phone,
      otp: this.otpCode
    }).subscribe({
      next: () => {
        this.verified.emit();     // Signal to parent
        this.dialogRef.close();   // Close modal
      },
      error: () => {
        this.showToast.emit('Invalid OTP');
      }
    });
  }

  handleResend(): void {
    if (!this.canResend) return;
      this.authService.resendOtp({ phone: this.phone }).subscribe(() => {
      this.showToast.emit('OTP resent successfully');
      this.otpCode = '';
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }
}
