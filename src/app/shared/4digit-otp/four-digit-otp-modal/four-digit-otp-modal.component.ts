import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { environment } from '../../../../../environment.prod';
import { AuthService } from '../../../services/auth.service';
import { OtpModalComponent } from '../../otp-modal/otp-modal.component';

@Component({
  selector: 'app-four-digit-otp-modal',
  imports: [],
  templateUrl: './four-digit-otp-modal.component.html',
  styleUrl: './four-digit-otp-modal.component.scss'
})
export class FourDigitOtpModalComponent implements OnDestroy {


  @Output() verified = new EventEmitter<void>();
  @Output() showToast = new EventEmitter<string>();

  otpCode = '';
  countdown = 300;
  canResend = false;
  timerSub!: Subscription;
  private baseUrl = environment.baseUrl;

  config = {
    length: 4,
    inputClass: 'otp-input',
    allowNumbersOnly: true,
    isPasswordInput: false,
    autofocus: true,
    placeholder: ''
  };

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<OtpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { phone: string; type: string }
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
    if (this.otpCode.length !== 4) {
      this.showToast.emit('Please enter the 4-digit OTP');
      return;
    }

    this.authService.verifyLoginOtp({
      phone: this.data.phone,
      otp: this.otpCode,
    }).subscribe({
      next: () => {
        this.verified.emit();            
        this.dialogRef.close(true);      
      },
      error: () => {
        this.showToast.emit('Invalid or expired OTP'); 
      }
    });
  }

  // handleResend(): void {
  //   if (!this.canResend) return;
  //     this.authService.resendOtp({ phone: this.data.phone }).subscribe(() => {
  //     this.showToast.emit('OTP resent successfully');
  //     this.otpCode = '';
  //     this.startTimer();
  //   });
  // }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  get phone(): string {
  return this.data.phone;
}
  get type(): string {
    return this.data.type;
  }

}
