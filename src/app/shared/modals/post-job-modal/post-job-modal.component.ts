import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthStorageService } from '../../../services/auth-storage.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JobService } from '../../../services/job.service';
import { ToastService } from '../../../services/toast.service';


@Component({
  selector: 'app-post-job-modal',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './post-job-modal.component.html',
  styleUrl: './post-job-modal.component.scss'
})
export class PostJobModalComponent {

     form: FormGroup;
     isSubmitting = false;

       constructor(
    private fb: FormBuilder,
    private authStorage: AuthStorageService,
    private jobService: JobService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<PostJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const user = this.authStorage.getUser();

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      minBudget: [0, [Validators.required, Validators.min(1)]],
      maxBudget: [0, [Validators.required, Validators.min(1)]],
      priority: ['low', Validators.required],
      userId: [user?.id, Validators.required] 
    });
  }

   onSubmit() {
          if (this.form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;

    this.jobService.createJob(this.form.value).subscribe({
      next: () => {
        this.toastService.success('Job posted successfully');
        this.dialogRef.close(true); // Signal that job was created
      },
      error: () => {
        this.toastService.error('Failed to post job');
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
