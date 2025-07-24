import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OtpModalComponent } from '../../shared/otp-modal/otp-modal.component'
import { environment } from '../../../../environment';
import { ToastService } from '../../services/toast.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  private baseUrl = environment.baseUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private toast: ToastService, private dialog: MatDialog) {
    this.registerForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', Validators.required],
  password: ['', Validators.required],
  role: ['user', Validators.required] // default to 'user'
});

  }

  handleSubmit(): void {
    if (this.registerForm.invalid) return;
    this.isSubmitting = true;

    this.http.post(`${this.baseUrl}/auth/register`, this.registerForm.value)
      .pipe(
        catchError((err) => {
          this.isSubmitting = false;
          this.toast.error(err?.error?.message || 'Registration failed');
          return of(null);
        })
      )
      .subscribe((res: any) => {
        if (res?.user) {
          this.toast.success('Registration successful. Please verify your phone number.');

           this.dialog.open(OtpModalComponent, {
            data: { phone: res.user.phone, type: 'registration' },
            disableClose: true,
            width: '700px',
     });
    }
        this.isSubmitting = false;
      });
  }

  onOtpSuccess(): void {
    this.toast.success('Your account has been verified.');
    this.router.navigate(['/login']);
    // Navigate to login
  }

    //  To handle toast from modal
  onToast(message: string): void {
    this.toast.show(message); 
  }
}