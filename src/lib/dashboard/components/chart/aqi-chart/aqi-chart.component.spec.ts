import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiChartComponent } from './aqi-chart.component';

describe('AqiChartComponent', () => {
  let component: AqiChartComponent;
  let fixture: ComponentFixture<AqiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
