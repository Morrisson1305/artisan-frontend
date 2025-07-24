import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostModalComponent } from './job-post-modal.component';

describe('JobPostModalComponent', () => {
  let component: JobPostModalComponent;
  let fixture: ComponentFixture<JobPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPostModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
