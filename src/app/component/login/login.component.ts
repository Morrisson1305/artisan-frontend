import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';
import { ToastService } from '../../../app/services/toast.service';
import { FourDigitOtpModalComponent } from '../../shared/4digit-otp/four-digit-otp-modal/four-digit-otp-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, FooterComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent {
  
  loginForm: FormGroup;
  loginPending = false;
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private dialog: MatDialog 
  ) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      password: ['', [Validators.required]],
    });
  }

handleSubmit(): void {
  if (this.loginForm.invalid) return;

  this.loginPending = true;
  const { phone, password } = this.loginForm.value;

  this.authService.login({ phone, password }).subscribe({
    next: () => {

      const dialogRef = this.dialog.open(FourDigitOtpModalComponent, {
        data: { phone, type: 'login' },
        disableClose: true,
        width: '700px',
      });

      dialogRef.componentInstance.verified.subscribe(() => {
        const user = this.authService.getUser();
        this.toast.success('Login successful');

        if (user?.isArtisan) {
          this.router.navigate(['/artisan-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      });

      dialogRef.componentInstance.showToast.subscribe((msg: string) => {
        this.toast.error(msg);
      });
    },
      error: (err) => {
        const msg = err.error?.message;
        if (msg === 'User is not verified') {
          this.toast.warning('Account not verified. Please register again or contact support.');
        } else {
          this.toast.error(msg || 'Invalid phone number or password');
        }
      },
    complete: () => {
      this.loginPending = false;
    },
  });
}

  onToast(message: string): void {
    this.toast.show(message); 
  }


}
