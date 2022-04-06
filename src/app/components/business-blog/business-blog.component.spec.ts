import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBlogComponent } from './business-blog.component';

describe('BusinessBlogComponent', () => {
  let component: BusinessBlogComponent;
  let fixture: ComponentFixture<BusinessBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
