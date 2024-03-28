import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCmbComponent } from './status-cmb.component';

describe('StatusCmbComponent', () => {
  let component: StatusCmbComponent;
  let fixture: ComponentFixture<StatusCmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusCmbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusCmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
