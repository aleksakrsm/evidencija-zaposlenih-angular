import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRegistrationLinkComponent } from './check-registration-link.component';

describe('CheckRegistrationLinkComponent', () => {
  let component: CheckRegistrationLinkComponent;
  let fixture: ComponentFixture<CheckRegistrationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckRegistrationLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckRegistrationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
