import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action = 'Close', duration = 3000) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  error(message: string) {
    this.show(`❌ ${message}`, 'Dismiss', 5000);
  }

  success(message: string) {
    this.show(`✅ ${message}`, 'Dismiss', 3000);
  }

  warning(message: string) {
  this.show(`⚠️ ${message}`, 'Dismiss', 4000);
}

}