import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantComponent } from './garant.component';

describe('GarantComponent', () => {
  let component: GarantComponent;
  let fixture: ComponentFixture<GarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
