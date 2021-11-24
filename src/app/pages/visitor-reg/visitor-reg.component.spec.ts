import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRegComponent } from './visitor-reg.component';

describe('VisitorRegComponent', () => {
  let component: VisitorRegComponent;
  let fixture: ComponentFixture<VisitorRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
