import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobModalComponent } from './five-digit-otp-modal.component';

describe('PostJobModalComponent', () => {
  let component: PostJobModalComponent;
  let fixture: ComponentFixture<PostJobModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostJobModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
