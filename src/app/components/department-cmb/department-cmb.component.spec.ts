import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCmbComponent } from './department-cmb.component';

describe('DepartmentCmbComponent', () => {
  let component: DepartmentCmbComponent;
  let fixture: ComponentFixture<DepartmentCmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentCmbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentCmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
