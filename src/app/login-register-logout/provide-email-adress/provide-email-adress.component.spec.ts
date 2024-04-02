import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideEmailAdressComponent } from './provide-email-adress.component';

describe('ProvideEmailAdressComponent', () => {
  let component: ProvideEmailAdressComponent;
  let fixture: ComponentFixture<ProvideEmailAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvideEmailAdressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProvideEmailAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
