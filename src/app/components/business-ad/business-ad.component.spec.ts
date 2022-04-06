import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAdComponent } from './business-ad.component';

describe('BusinessAdComponent', () => {
  let component: BusinessAdComponent;
  let fixture: ComponentFixture<BusinessAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
