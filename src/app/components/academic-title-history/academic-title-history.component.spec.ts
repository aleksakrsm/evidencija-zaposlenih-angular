import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTitleHistoryComponent } from './academic-title-history.component';

describe('AcademicTitleHistoryComponent', () => {
  let component: AcademicTitleHistoryComponent;
  let fixture: ComponentFixture<AcademicTitleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicTitleHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicTitleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
