import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTitleCmbComponent } from './education-title-cmb.component';

describe('EducationTitleCmbComponent', () => {
  let component: EducationTitleCmbComponent;
  let fixture: ComponentFixture<EducationTitleCmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationTitleCmbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EducationTitleCmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
