import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { Job } from '../../models/job.model'; // Update the path as needed

@Component({
  selector: 'app-bid-modal',
  imports: [],
  templateUrl: './bid-modal.component.html',
  styleUrl: './bid-modal.component.scss'
})
export class BidModalComponent {
  //@Input() job!: Job;
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      amount: [''],
      estimatedTime: [''],
      coverLetter: [''],
    });
  }

  submitBid() {
    const bid = {
      ...this.form.value,
    //  jobId: this.job.id,
      artisanId: 'ARTISAN_ID', // replace with actual
    };

    this.http.post('/api/bids', bid).subscribe(() => {
      alert('Bid submitted'); // Replace with toast
    });
  }
}
