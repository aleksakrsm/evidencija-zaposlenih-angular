import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTitleCmbComponent } from './academic-title-cmb.component';

describe('AcademicTitleCmbComponent', () => {
  let component: AcademicTitleCmbComponent;
  let fixture: ComponentFixture<AcademicTitleCmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicTitleCmbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicTitleCmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
