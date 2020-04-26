import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeBrightnessComponent } from './range-brightness.component';

describe('RangeBrightnessComponent', () => {
  let component: RangeBrightnessComponent;
  let fixture: ComponentFixture<RangeBrightnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeBrightnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeBrightnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
