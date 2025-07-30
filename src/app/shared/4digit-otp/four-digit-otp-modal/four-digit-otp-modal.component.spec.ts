import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourDigitOtpModalComponent } from './four-digit-otp-modal.component';

describe('FourDigitOtpModalComponent', () => {
  let component: FourDigitOtpModalComponent;
  let fixture: ComponentFixture<FourDigitOtpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourDigitOtpModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourDigitOtpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
