import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsFilterComponent } from './subjects-filter.component';

describe('SubjectsFilterComponent', () => {
  let component: SubjectsFilterComponent;
  let fixture: ComponentFixture<SubjectsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
