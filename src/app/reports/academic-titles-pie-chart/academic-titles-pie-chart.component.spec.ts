import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTitlesPieChartComponent } from './academic-titles-pie-chart.component';

describe('AcademicTitlesPieChartComponent', () => {
  let component: AcademicTitlesPieChartComponent;
  let fixture: ComponentFixture<AcademicTitlesPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicTitlesPieChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicTitlesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
