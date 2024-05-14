import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATitlesPieChartJSComponent } from './atitles-pie-chart-js.component';

describe('ATitlesPieChartJSComponent', () => {
  let component: ATitlesPieChartJSComponent;
  let fixture: ComponentFixture<ATitlesPieChartJSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ATitlesPieChartJSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ATitlesPieChartJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
