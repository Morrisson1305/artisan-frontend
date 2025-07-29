import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';
import { ToastService } from '../../../app/services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    private router: Router
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
      next: (data) => {
        this.toast.success('Welcome back! You have been successfully logged in.');

        if (data.user?.isArtisan) {
          this.router.navigate(['/artisan-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      error: (err) => {
        this.toast.error('Login failed or Invalid credentials');
      },
      complete: () => {
        this.loginPending = false;
      },
    });
  }
}
