import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorTestListComponent } from './visitor-test-list.component';

describe('VisitorTestListComponent', () => {
  let component: VisitorTestListComponent;
  let fixture: ComponentFixture<VisitorTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorTestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
