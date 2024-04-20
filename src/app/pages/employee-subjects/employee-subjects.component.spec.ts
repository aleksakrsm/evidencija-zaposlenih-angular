import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSubjectsComponent } from './employee-subjects.component';

describe('EmployeeSubjectsComponent', () => {
  let component: EmployeeSubjectsComponent;
  let fixture: ComponentFixture<EmployeeSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSubjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
