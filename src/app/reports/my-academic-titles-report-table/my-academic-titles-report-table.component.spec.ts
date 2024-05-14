import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcademicTitlesReportTableComponent } from './my-academic-titles-report-table.component';

describe('MyAcademicTitlesReportTableComponent', () => {
  let component: MyAcademicTitlesReportTableComponent;
  let fixture: ComponentFixture<MyAcademicTitlesReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAcademicTitlesReportTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAcademicTitlesReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
