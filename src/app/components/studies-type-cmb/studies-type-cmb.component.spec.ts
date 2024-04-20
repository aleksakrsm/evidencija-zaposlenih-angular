import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesTypeCmbComponent } from './studies-type-cmb.component';

describe('StudiesTypeCmbComponent', () => {
  let component: StudiesTypeCmbComponent;
  let fixture: ComponentFixture<StudiesTypeCmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudiesTypeCmbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudiesTypeCmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
