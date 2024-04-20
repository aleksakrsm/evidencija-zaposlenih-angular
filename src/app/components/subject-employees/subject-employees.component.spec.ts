import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEmployeesComponent } from './subject-employees.component';

describe('SubjectEmployeesComponent', () => {
  let component: SubjectEmployeesComponent;
  let fixture: ComponentFixture<SubjectEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
